import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import type { GhostSpot } from '../../../types/spot'

interface SpotDetailCardProps {
  spot: GhostSpot
  onMoreLegend?: () => void
}

export function SpotDetailCard({ spot, onMoreLegend }: SpotDetailCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="relative -mt-2 rounded-t-3xl bg-gradient-to-b from-spot-card via-spot-surface to-spot-bg px-5 pt-6 pb-5">
      <div className="mb-3 flex items-start gap-2">
        <span
          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary shadow-[0_0_10px_rgba(239,68,68,0.9)]"
          aria-hidden
        />
        <h1 className="text-base leading-snug font-semibold text-white">{spot.name}</h1>
      </div>

      <p
        className={`text-sm leading-relaxed text-spot-muted ${
          expanded ? '' : 'line-clamp-4'
        }`}
      >
        {spot.description}
      </p>

      <button
        type="button"
        onClick={() => {
          if (expanded) {
            onMoreLegend?.()
          } else {
            setExpanded(true)
          }
        }}
        className="mt-3 flex w-full items-center justify-end gap-0.5 text-sm font-medium text-secondary transition-colors hover:text-tertiary"
      >
        {expanded ? '괴담 콘텐츠 보러가기' : '괴담 내용 더 보러가기'}
        <ChevronRight size={16} />
      </button>
    </section>
  )
}
