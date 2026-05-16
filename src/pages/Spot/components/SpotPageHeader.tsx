import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export function SpotPageHeader() {
  const navigate = useNavigate()

  return (
    <header className="px-4 pt-3 pb-2">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="뒤로 가기"
        className="flex h-9 w-9 items-center justify-center text-primary/80 transition-colors hover:text-secondary"
      >
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>
    </header>
  )
}
