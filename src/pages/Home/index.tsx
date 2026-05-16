import { Link } from 'react-router-dom'
import { DUMMY_SPOT } from '../../constants/spot'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black px-4 text-white">
      <h1 className="text-2xl font-semibold">Ghostrip</h1>
      <p className="text-center text-sm text-gray-400">공포 명소 탐험 플랫폼</p>
      <Link
        to={`/spots/${DUMMY_SPOT.id}`}
        className="rounded-xl bg-purple-700 px-6 py-3 text-sm font-medium transition-colors hover:bg-purple-600"
      >
        {DUMMY_SPOT.name} 상세 보기
      </Link>
    </div>
  )
}
