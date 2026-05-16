import type { GhostSpot } from '../../../types/spot'

interface SpotDescriptionProps {
  spot: GhostSpot
}

export function SpotDescription({ spot }: SpotDescriptionProps) {
  return (
    <div className="space-y-2 rounded-xl border border-gray-800 bg-gray-900/40 p-4">
      <h2 className="text-base text-white">장소 소개</h2>
      <p className="text-sm leading-relaxed text-gray-400">{spot.description}</p>
    </div>
  )
}
