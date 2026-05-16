import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Flame, Heart, Images } from 'lucide-react'
import type { GhostSpot } from '../../../types/spot'

interface SpotHeroProps {
  spot: GhostSpot
}

export function SpotHero({ spot }: SpotHeroProps) {
  const navigate = useNavigate()
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <div className="relative h-72 overflow-hidden sm:h-96">
      <img src={spot.imageUrl} alt={spot.name} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

      <div className="absolute top-0 right-0 left-0 flex items-center justify-between p-4 pt-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setBookmarked(!bookmarked)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            <Heart
              size={18}
              className={bookmarked ? 'fill-red-500 text-red-500' : 'text-white'}
            />
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-4">
        <span className="flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          <Flame size={13} />
          공포 명소 TOP 10
        </span>
      </div>

      {spot.galleryImages.length > 0 && (
        <div className="absolute right-4 bottom-4">
          <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs text-gray-300 backdrop-blur-sm">
            <Images size={12} />
            +{spot.galleryImages.length}
          </span>
        </div>
      )}
    </div>
  )
}
