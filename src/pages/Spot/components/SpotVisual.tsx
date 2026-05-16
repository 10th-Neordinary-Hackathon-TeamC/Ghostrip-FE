import { MapPin } from 'lucide-react'
import { SPOT_DISPLAY_META } from '../../../constants/spot'
import type { GhostSpot } from '../../../types/spot'

interface SpotVisualProps {
  spot: GhostSpot
}

export function SpotVisual({ spot }: SpotVisualProps) {
  return (
    <section className="flex flex-col items-center gap-4 px-4 pt-2 pb-4">
      <span className="rounded-full bg-secondary px-5 py-1.5 text-xs font-semibold text-white">
        {SPOT_DISPLAY_META.category}
      </span>

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-spot-surface shadow-[0_0_24px_rgba(239,68,68,0.35)]">
        <MapPin size={28} className="text-secondary drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
      </div>

      <div className="w-full overflow-hidden rounded-xl border-2 border-secondary">
        <img
          src={spot.imageUrl}
          alt={spot.name}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
    </section>
  )
}
