import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Search } from 'lucide-react'

export function SpotPageHeader() {
  const navigate = useNavigate()

  return (
    <header className="flex items-center gap-2 px-4 pt-3 pb-2">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="뒤로 가기"
        className="flex h-9 w-9 shrink-0 items-center justify-center text-primary/80 transition-colors hover:text-secondary"
      >
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>
      <div className="relative flex-1">
        <input
          type="search"
          placeholder="심령 스팟 검색하기"
          className="w-full rounded-full border border-primary/50 bg-spot-input py-2.5 pr-11 pl-4 text-sm text-white placeholder:text-spot-dim focus:border-secondary focus:outline-none"
        />
        <Search
          size={18}
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-secondary"
        />
      </div>
    </header>
  )
}
