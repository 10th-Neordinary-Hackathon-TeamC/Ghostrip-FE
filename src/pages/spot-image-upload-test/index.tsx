import { useState } from 'react'
import SpotImageUploader from './components/SpotImageUploader'
import HumanBgConverter from './components/HumanBgConverter'
import MoodConverter from './components/MoodConverter'

export default function SpotImageUploadTestPage() {
  const [spotIdInput, setSpotIdInput] = useState<string>('1')

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10">
        <header>
          <h1 className="text-2xl font-bold">🛠 Spot 이미지 / Convert API 실험 페이지</h1>
          <p className="mt-2 text-sm text-gray-400">
            S3 업로드 흐름과 두 가지 Convert API(/human-bg, /mood)를 한 페이지에서 테스트합니다.
          </p>
        </header>

        {/* ─── 1) 스팟 이미지 등록 ─── */}
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-bold">① 심령스팟 이미지 등록</h2>
            <p className="text-xs text-gray-400">
              여러 장을 S3에 업로드 → <code className="text-pink-300">/api/spot/{`{spotId}`}/image</code> 로 등록
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-5">
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
          </div>

          <SpotImageUploader spotId={spotIdInput} />
        </section>

        {/* ─── 2) 인물 + 배경 합성 ─── */}
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-bold">② 인물 + 배경 합성</h2>
            <p className="text-xs text-gray-400">
              두 사진을 S3에 업로드 → <code className="text-pink-300">/api/spot/convert/image/human-bg</code> 호출
            </p>
          </div>
          <HumanBgConverter />
        </section>

        {/* ─── 3) 분위기 변환 ─── */}
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-bold">③ 배경 분위기 변환</h2>
            <p className="text-xs text-gray-400">
              배경 1장을 S3에 업로드 → <code className="text-pink-300">/api/spot/convert/image/mood</code> 호출
            </p>
          </div>
          <MoodConverter />
        </section>

        <details className="rounded-xl border border-gray-800 bg-gray-900/40 p-4 text-sm">
          <summary className="cursor-pointer text-gray-300">공통 동작 흐름</summary>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-gray-400">
            <li>파일별로 <code className="text-pink-300">POST /api/s3/presigned-url</code> 호출 (prefix 는 기능별로 상이)</li>
            <li>받은 <code className="text-pink-300">presignedUrl</code> 로 파일을 <code className="text-pink-300">PUT</code> 업로드</li>
            <li>업로드 후 얻은 <code className="text-pink-300">imageUrl</code> 을 각 기능 API의 입력으로 사용</li>
          </ol>
        </details>
      </div>
    </div>
  )
}
