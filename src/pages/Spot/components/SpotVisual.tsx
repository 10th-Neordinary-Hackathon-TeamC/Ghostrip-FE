import { SPOT_DISPLAY_META } from '../../../constants/spot'
import type { GhostSpot } from '../../../types/spot'

interface SpotVisualProps {
  spot: GhostSpot
}

export function SpotVisual({ spot }: SpotVisualProps) {
  const displayName = SPOT_DISPLAY_META.category

  return (
    <section className="relative w-full">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={spot.imageUrl}
          alt={spot.name}
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15"
          aria-hidden
        />

        <div className="absolute right-0 bottom-0 left-0 px-5 pb-6 pt-16">
          <h1 className="text-[26px] leading-tight font-bold tracking-tight text-white">
            {displayName}
          </h1>
          <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full bg-primary px-3.5 py-2 shadow-[0_2px_12px_rgba(127,28,29,0.5)]">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-tertiary shadow-[0_0_6px_rgba(255,179,173,0.9)]"
              aria-hidden
            />
            <span className="truncate text-xs leading-snug text-white">{spot.address}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
