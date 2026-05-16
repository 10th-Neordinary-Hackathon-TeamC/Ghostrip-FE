import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black px-4 text-white">
      <h1 className="text-4xl font-semibold">404</h1>
      <p className="text-sm text-gray-400">페이지를 찾을 수 없습니다.</p>
      <Link
        to="/"
        className="rounded-xl bg-purple-700 px-5 py-2.5 text-sm transition-colors hover:bg-purple-600"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
