import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export function SpotPageHeader() {
  const navigate = useNavigate()

  return (
    <header className="px-5 pt-4 pb-2">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="뒤로 가기"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
      >
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>
    </header>
  )
}
