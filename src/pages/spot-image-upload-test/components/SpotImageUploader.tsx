import { useMemo, useRef, useState } from 'react'
import { uploadSpotImages, type SpotImageItem } from '../../../apis/upload'

interface SpotImageUploaderProps {
  spotId: number | string
  onUploaded?: (items: SpotImageItem[]) => void
}

interface PreviewItem {
  file: File
  previewUrl: string
  status: 'pending' | 'uploading' | 'done' | 'error'
}

export default function SpotImageUploader({ spotId, onUploaded }: SpotImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [items, setItems] = useState<PreviewItem[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState<{ done: number; total: number }>({ done: 0, total: 0 })
  const [error, setError] = useState<string | null>(null)
  const [registered, setRegistered] = useState<SpotImageItem[] | null>(null)

  const canUpload = useMemo(
    () => items.length > 0 && !isUploading && !!spotId,
    [items.length, isUploading, spotId],
  )

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList || fileList.length === 0) return

    setItems((prev) => {
      // 이름+크기로 중복 제거 (같은 파일을 다시 골랐을 때)
      const existingKeys = new Set(prev.map((it) => `${it.file.name}__${it.file.size}`))
      const incoming: PreviewItem[] = Array.from(fileList)
        .filter((f) => !existingKeys.has(`${f.name}__${f.size}`))
        .map((file) => ({
          file,
          previewUrl: URL.createObjectURL(file),
          status: 'pending',
        }))
      return [...prev, ...incoming]
    })
    setRegistered(null)
    setError(null)
    setProgress({ done: 0, total: 0 })

    // 같은 파일을 다시 선택해도 onChange 가 발생하도록 값 초기화
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleRemove = (idx: number) => {
    setItems((prev) => {
      const target = prev[idx]
      if (target) URL.revokeObjectURL(target.previewUrl)
      return prev.filter((_, i) => i !== idx)
    })
  }

  const handleClear = () => {
    items.forEach((it) => URL.revokeObjectURL(it.previewUrl))
    setItems([])
    setRegistered(null)
    setError(null)
    setProgress({ done: 0, total: 0 })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleUpload = async () => {
    if (!canUpload) return
    setIsUploading(true)
    setError(null)
    setRegistered(null)
    setProgress({ done: 0, total: items.length })

    // 모두 uploading 상태로 변경
    setItems((prev) => prev.map((it) => ({ ...it, status: 'uploading' })))

    try {
      const result = await uploadSpotImages(
        spotId,
        items.map((it) => it.file),
        ({ index }) => {
          setItems((prev) =>
            prev.map((it, i) => (i === index ? { ...it, status: 'done' } : it)),
          )
          setProgress((prev) => ({ ...prev, done: index + 1 }))
        },
      )
      setRegistered(result)
      onUploaded?.(result)
    } catch (e) {
      const message = e instanceof Error ? e.message : '업로드 중 오류가 발생했습니다.'
      setError(message)
      setItems((prev) =>
        prev.map((it) => (it.status === 'uploading' ? { ...it, status: 'error' } : it)),
      )
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-700 bg-gray-900/40 p-5 text-gray-100">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-gray-300">
          업로드 대상 스팟 ID: <span className="font-mono text-pink-300">{spotId || '(미지정)'}</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg bg-pink-600 px-3 py-1.5 text-sm font-medium hover:bg-pink-500 disabled:opacity-40"
            disabled={isUploading}
          >
            파일 추가
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-gray-600 px-3 py-1.5 text-sm hover:bg-gray-800 disabled:opacity-40"
            disabled={isUploading || items.length === 0}
          >
            초기화
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleSelectFiles}
        />
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-700 py-10 text-center text-sm text-gray-400">
          이미지를 선택해 주세요.
          <div className="mt-1 text-xs text-gray-500">
            한 번에 여러 장: macOS는 ⌘+클릭 / Windows는 Ctrl+클릭 (범위 선택은 Shift+클릭)
            <br />
            또는 "파일 추가" 버튼을 여러 번 눌러서 누적 선택도 가능합니다.
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {items.map((it, idx) => (
            <li
              key={`${it.file.name}-${idx}`}
              className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800/60"
            >
              <img src={it.previewUrl} alt={it.file.name} className="aspect-square w-full object-cover" />
              <div className="flex items-center justify-between gap-2 px-2 py-1.5 text-xs">
                <span className="truncate" title={it.file.name}>
                  {it.file.name}
                </span>
                <StatusBadge status={it.status} />
              </div>
              {!isUploading && (
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="absolute right-1 top-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] hover:bg-black/80"
                >
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400">
          {isUploading
            ? `업로드 중... (${progress.done}/${progress.total})`
            : `${items.length}개 파일 대기`}
        </div>
        <button
          type="button"
          onClick={handleUpload}
          disabled={!canUpload}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500 disabled:opacity-40"
        >
          업로드 → 스팟에 등록
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-950/40 p-3 text-sm text-red-200">
          오류: {error}
        </div>
      )}

      {registered && (
        <div className="rounded-lg border border-emerald-600/40 bg-emerald-950/30 p-3">
          <div className="mb-2 text-sm font-semibold text-emerald-200">
            등록 완료! {registered.length}개 이미지가 스팟 #{spotId}에 추가되었습니다.
          </div>
          <ul className="space-y-1 text-xs">
            {registered.map((r) => (
              <li key={r.spotImageId} className="flex items-center gap-2">
                <span className="text-emerald-300">#{r.spotImageId}</span>
                <a
                  href={r.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-blue-300 underline"
                >
                  {r.imageUrl}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: PreviewItem['status'] }) {
  const map: Record<PreviewItem['status'], { label: string; cls: string }> = {
    pending: { label: '대기', cls: 'bg-gray-600 text-gray-100' },
    uploading: { label: '업로드중', cls: 'bg-blue-600 text-white' },
    done: { label: '완료', cls: 'bg-emerald-600 text-white' },
    error: { label: '실패', cls: 'bg-red-600 text-white' },
  }
  const { label, cls } = map[status]
  return <span className={`rounded px-1.5 py-0.5 text-[10px] ${cls}`}>{label}</span>
}
