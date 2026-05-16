import { useState } from 'react'
import SpotImageUploader from './components/SpotImageUploader'

export default function SpotImageUploadTestPage() {
  const [spotIdInput, setSpotIdInput] = useState<string>('1')

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">🛠 Spot Image Upload 실험 페이지</h1>
          <p className="mt-2 text-sm text-gray-400">
            S3 presigned-url 발급 → S3에 PUT 업로드 → /api/spot/{`{spotId}`}/image 로 등록까지 한 번에 테스트합니다.
          </p>
        </header>

        <section className="mb-6 rounded-2xl border border-gray-800 bg-gray-900/40 p-5">
          <label className="block text-sm font-medium text-gray-200">
            대상 Spot ID
            <input
              type="text"
              inputMode="numeric"
              value={spotIdInput}
              onChange={(e) => setSpotIdInput(e.target.value.trim())}
              placeholder="예: 1"
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm font-mono outline-none focus:border-pink-500"
            />
          </label>
          <p className="mt-2 text-xs text-gray-500">
            존재하는 스팟 ID 를 입력하세요. 입력한 ID 의 스팟에 이미지가 등록됩니다.
          </p>
        </section>

        <SpotImageUploader spotId={spotIdInput} />

        <details className="mt-8 rounded-xl border border-gray-800 bg-gray-900/40 p-4 text-sm">
          <summary className="cursor-pointer text-gray-300">동작 흐름 보기</summary>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-gray-400">
            <li>선택한 각 파일에 대해 <code className="text-pink-300">POST /api/s3/presigned-url</code> 호출 (prefix=<code>spotImage</code>, fileName=원본명)</li>
            <li>받은 <code className="text-pink-300">presignedUrl</code> 로 파일을 <code className="text-pink-300">PUT</code> 업로드</li>
            <li>업로드된 모든 <code className="text-pink-300">imageUrl</code> 을 모아서 <code className="text-pink-300">POST /api/spot/{`{spotId}`}/image</code> 로 등록</li>
            <li>서버가 반환한 등록 결과를 화면 하단에 표시</li>
          </ol>
        </details>
      </div>
    </div>
  )
}
