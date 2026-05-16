import { useRef, useState } from 'react'
import { getPresignedUrl, putFileToS3 } from '../../../apis/upload'
import { convertHumanBg } from '../../../apis/spotConvert'

type Status = 'idle' | 'uploading-person' | 'uploading-spot' | 'converting' | 'done' | 'error'

export default function HumanBgConverter() {
  const personInputRef = useRef<HTMLInputElement | null>(null)
  const spotInputRef = useRef<HTMLInputElement | null>(null)

  const [personFile, setPersonFile] = useState<File | null>(null)
  const [spotFile, setSpotFile] = useState<File | null>(null)
  const [personPreview, setPersonPreview] = useState<string>('')
  const [spotPreview, setSpotPreview] = useState<string>('')

  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null)

  const isBusy =
    status === 'uploading-person' || status === 'uploading-spot' || status === 'converting'

  const handlePick = (kind: 'person' | 'spot') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (kind === 'person') {
      if (personPreview) URL.revokeObjectURL(personPreview)
      setPersonFile(file)
      setPersonPreview(URL.createObjectURL(file))
    } else {
      if (spotPreview) URL.revokeObjectURL(spotPreview)
      setSpotFile(file)
      setSpotPreview(URL.createObjectURL(file))
    }
    setConvertedUrl(null)
    setError(null)
    setStatus('idle')
  }

  const uploadOne = async (file: File, prefix: string): Promise<string> => {
    const { presignedUrl, imageUrl } = await getPresignedUrl(prefix, file.name)
    await putFileToS3(presignedUrl, file)
    return imageUrl
  }

  const handleRun = async () => {
    if (!personFile || !spotFile) {
      setError('인물 사진과 심령스팟 배경 사진을 모두 선택하세요.')
      return
    }
    setError(null)
    setConvertedUrl(null)
    try {
      setStatus('uploading-person')
      const personImageUrl = await uploadOne(personFile, 'person')

      setStatus('uploading-spot')
      const spotImageUrl = await uploadOne(spotFile, 'spot')

      setStatus('converting')
      const { convertedImageUrl } = await convertHumanBg({ personImageUrl, spotImageUrl })
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
        <h2 className="text-lg font-bold">👤 인물 + 배경 합성 (/human-bg)</h2>
        <p className="mt-1 text-xs text-gray-400">
          인물 사진과 심령스팟 배경 사진을 각각 S3에 업로드한 뒤, 두 URL을 합성 API에 전달합니다.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <FileSlot
          label="인물 사진"
          file={personFile}
          previewUrl={personPreview}
          inputRef={personInputRef}
          onChange={handlePick('person')}
          disabled={isBusy}
        />
        <FileSlot
          label="심령스팟 배경"
          file={spotFile}
          previewUrl={spotPreview}
          inputRef={spotInputRef}
          onChange={handlePick('spot')}
          disabled={isBusy}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <StatusLine status={status} />
        <button
          type="button"
          onClick={handleRun}
          disabled={isBusy || !personFile || !spotFile}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500 disabled:opacity-40"
        >
          업로드 → 합성 실행
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-950/40 p-3 text-sm text-red-200">
          오류: {error}
        </div>
      )}

      {convertedUrl && (
        <ResultPanel imageUrl={convertedUrl} />
      )}
    </div>
  )
}

function FileSlot({
  label,
  file,
  previewUrl,
  inputRef,
  onChange,
  disabled,
}: {
  label: string
  file: File | null
  previewUrl: string
  inputRef: React.RefObject<HTMLInputElement | null>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800/40">
      <div className="flex items-center justify-between px-3 py-2 text-sm">
        <span className="font-medium text-gray-200">{label}</span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="rounded-md bg-pink-600 px-2.5 py-1 text-xs font-medium hover:bg-pink-500 disabled:opacity-40"
        >
          {file ? '변경' : '선택'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            onChange(e)
            if (inputRef.current) inputRef.current.value = ''
          }}
        />
      </div>
      <div className="aspect-square w-full bg-gray-950">
        {previewUrl ? (
          <img src={previewUrl} alt={label} className="h-full w-full object-cover" />
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
  )
}

function StatusLine({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    idle: '대기',
    'uploading-person': '인물 사진 업로드 중...',
    'uploading-spot': '스팟 배경 업로드 중...',
    converting: 'AI 합성 중... (10~30초)',
    done: '완료',
    error: '오류',
  }
  return <span className="text-xs text-gray-400">상태: {map[status]}</span>
}

function ResultPanel({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="space-y-2 rounded-lg border border-emerald-600/40 bg-emerald-950/30 p-3">
      <div className="text-sm font-semibold text-emerald-200">합성 결과</div>
      <img src={imageUrl} alt="합성 결과" className="w-full rounded-md" />
      <a
        href={imageUrl}
        target="_blank"
        rel="noreferrer"
        className="block truncate text-xs text-blue-300 underline"
      >
        {imageUrl}
      </a>
    </div>
  )
}
