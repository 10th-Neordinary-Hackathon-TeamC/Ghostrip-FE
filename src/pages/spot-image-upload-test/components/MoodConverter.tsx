import { useRef, useState } from 'react'
import { getPresignedUrl, putFileToS3 } from '../../../apis/upload'
import { convertMood } from '../../../apis/spotConvert'

type Status = 'idle' | 'uploading' | 'converting' | 'done' | 'error'

export default function MoodConverter() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null)

  const isBusy = status === 'uploading' || status === 'converting'

  const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0]
    if (!picked) return
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setFile(picked)
    setPreviewUrl(URL.createObjectURL(picked))
    setConvertedUrl(null)
    setError(null)
    setStatus('idle')
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleRun = async () => {
    if (!file) {
      setError('배경 사진을 선택하세요.')
      return
    }
    setError(null)
    setConvertedUrl(null)
    try {
      setStatus('uploading')
      const { presignedUrl, imageUrl } = await getPresignedUrl('background', file.name)
      await putFileToS3(presignedUrl, file)

      setStatus('converting')
      const { convertedImageUrl } = await convertMood({ backgroundImageUrl: imageUrl })
      setConvertedUrl(convertedImageUrl)
      setStatus('done')
    } catch (e) {
      const message = e instanceof Error ? e.message : '실행 중 오류가 발생했습니다.'
      setError(message)
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-700 bg-gray-900/40 p-5 text-gray-100">
      <header>
        <h2 className="text-lg font-bold">🌫 배경 분위기 변환 (/mood)</h2>
        <p className="mt-1 text-xs text-gray-400">
          배경 사진 1장을 S3에 업로드한 뒤, 그 URL로 심령사진 톤 변환 API를 호출합니다.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800/40">
          <div className="flex items-center justify-between px-3 py-2 text-sm">
            <span className="font-medium text-gray-200">배경 사진</span>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isBusy}
              className="rounded-md bg-pink-600 px-2.5 py-1 text-xs font-medium hover:bg-pink-500 disabled:opacity-40"
            >
              {file ? '변경' : '선택'}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePick}
            />
          </div>
          <div className="aspect-square w-full bg-gray-950">
            {previewUrl ? (
              <img src={previewUrl} alt="원본" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-500">
                (이미지 미선택)
              </div>
            )}
          </div>
          {file && (
            <div className="truncate px-3 py-1.5 text-[11px] text-gray-400" title={file.name}>
              {file.name}
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800/40">
          <div className="px-3 py-2 text-sm font-medium text-gray-200">변환 결과</div>
          <div className="aspect-square w-full bg-gray-950">
            {convertedUrl ? (
              <img src={convertedUrl} alt="변환 결과" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-500">
                (아직 변환 전)
              </div>
            )}
          </div>
          {convertedUrl && (
            <a
              href={convertedUrl}
              target="_blank"
              rel="noreferrer"
              className="block truncate px-3 py-1.5 text-[11px] text-blue-300 underline"
            >
              {convertedUrl}
            </a>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <StatusLine status={status} />
        <button
          type="button"
          onClick={handleRun}
          disabled={isBusy || !file}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500 disabled:opacity-40"
        >
          업로드 → 분위기 변환
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-950/40 p-3 text-sm text-red-200">
          오류: {error}
        </div>
      )}
    </div>
  )
}

function StatusLine({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    idle: '대기',
    uploading: '배경 업로드 중...',
    converting: 'AI 변환 중... (5~15초)',
    done: '완료',
    error: '오류',
  }
  return <span className="text-xs text-gray-400">상태: {map[status]}</span>
}
