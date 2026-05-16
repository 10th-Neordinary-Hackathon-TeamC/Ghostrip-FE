import { MapPin } from 'lucide-react'
import type { GhostSpot } from '../../../types/spot'

interface SpotLocationProps {
  spot: GhostSpot
}

export function SpotLocation({ spot }: SpotLocationProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold text-white">위치</h2>
      <p className="text-sm leading-relaxed text-spot-muted">{spot.address}</p>
      <div className="relative h-36 overflow-hidden rounded-xl border border-primary/30 bg-spot-surface">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin size={28} className="text-secondary drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
        </div>
        {/* TODO(API): latitude, longitude — 지도 SDK 연동 */}
      </div>
    </section>
  )
}
