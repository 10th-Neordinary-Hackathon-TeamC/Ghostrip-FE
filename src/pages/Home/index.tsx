import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DUMMY_SPOT } from '../../constants/spot'

export default function HomePage() {
  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL
    if (!base) return

    fetch(`${base}health`)
      .then((res) => {
        if (res.ok) {
          console.log('[HealthCheck] API 서버 정상:', res.status)
        } else {
          console.error('[HealthCheck] API 서버 응답 오류:', res.status, res.statusText)
        }
      })
      .catch((err) => {
        console.error('[HealthCheck] API 서버 연결 실패:', err.message)
      })
  }, [])

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
    </motion.div>
  )
}
