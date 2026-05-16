import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { SPOT_DISPLAY_META } from '../../../constants/spot'
import type { GhostSpot } from '../../../types/spot'

interface SpotDetailCardProps {
  spot: GhostSpot
  onMoreLegend?: () => void
}

export function SpotDetailCard({ spot, onMoreLegend }: SpotDetailCardProps) {
  const [expanded, setExpanded] = useState(false)
  const displayName = SPOT_DISPLAY_META.category

  return (
    <section className="relative -mt-4 rounded-t-3xl border border-primary/20 bg-gradient-to-b from-spot-card via-spot-surface to-spot-bg px-5 pt-7 pb-7">
      <div className="mb-4 flex items-start gap-2">
        <span
          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary shadow-[0_0_10px_rgba(239,68,68,0.9)]"
          aria-hidden
        />
        <h2 className="text-base font-semibold text-white">{displayName}이란..</h2>
      </div>

      <div className="spot-text-box">
        <p
          className={`text-sm leading-relaxed text-spot-muted ${
            expanded ? '' : 'line-clamp-4'
          }`}
        >
          {spot.description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          if (expanded) {
            onMoreLegend?.()
          } else {
            setExpanded(true)
          }
        }}
        className="mt-5 flex w-full items-center justify-end gap-0.5 text-sm font-medium text-secondary transition-colors hover:text-tertiary"
      >
        {expanded ? '괴담 콘텐츠 보러가기' : '괴담 내용 더 보러가기'}
        <ChevronRight size={16} />
      </button>
    </section>
  )
}
