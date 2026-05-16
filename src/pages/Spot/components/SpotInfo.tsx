import { Ghost, MapPin, MessageCircle } from 'lucide-react'
import type { GhostSpot } from '../../../types/spot'

interface SpotInfoProps {
  spot: GhostSpot
  commentCount: number
}

export function SpotInfo({ spot, commentCount }: SpotInfoProps) {
  return (
    <div className="space-y-2 pt-2">
      <div className="flex items-start gap-2">
        <Ghost size={20} className="mt-0.5 shrink-0 text-purple-400" />
        <h1 className="leading-tight text-white">{spot.name}</h1>
      </div>
      <div className="flex items-start gap-1.5 text-sm text-gray-500">
        <MapPin size={14} className="mt-0.5 shrink-0" />
        <span>{spot.address}</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-400">
        <span className="flex items-center gap-1">
          <MessageCircle size={13} />
          {commentCount}개 후기
        </span>
      </div>
    </div>
  )
}
