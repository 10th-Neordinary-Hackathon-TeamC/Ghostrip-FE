import { Link } from 'react-router-dom'
import { DUMMY_SPOT } from '../../constants/spot'

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[360px] flex-col items-center justify-center gap-6 bg-spot-bg px-4">
      <h1 className="text-2xl font-semibold text-white">Ghostrip</h1>
      <p className="text-center text-sm text-spot-muted">공포 명소 탐험 플랫폼</p>
      <Link
        to={`/spots/${DUMMY_SPOT.id}`}
        className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
      >
        {DUMMY_SPOT.name} 상세 보기
      </Link>
    </div>
  )
}
