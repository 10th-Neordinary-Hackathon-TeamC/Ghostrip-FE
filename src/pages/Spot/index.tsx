import { useRef } from 'react'
import { useParams } from 'react-router-dom'
// TODO(API): DUMMY_* 제거 후 apiClient로 fetch
import { DUMMY_COMMENTS, DUMMY_SPOT } from '../../constants/spot'
import type { GhostSpot, SpotComment } from '../../types/spot'
import { EntryStatus } from './components/EntryStatus'
import { HorrorStars } from './components/HorrorStars'
import { SpotCommentsSection } from './components/SpotCommentsSection'
import { ImageGallery } from './components/ImageGallery'
import { RelatedContentSection } from './components/RelatedContentSection'
import { SpotDetailCard } from './components/SpotDetailCard'
import { SpotPageHeader } from './components/SpotPageHeader'
import { SpotVisual } from './components/SpotVisual'
import { SpotLocation } from './components/SpotLocation'
import { useSpotComments } from './hooks/useSpotComments'

interface SpotPageProps {
  spot?: GhostSpot
  initialComments?: SpotComment[]
}

export default function SpotPage({
  spot = DUMMY_SPOT,
  initialComments = DUMMY_COMMENTS,
}: SpotPageProps) {
  const { spotId } = useParams<{ spotId: string }>()
  const displaySpot = { ...spot, id: spotId ?? spot.id }
  const relatedRef = useRef<HTMLElement>(null)

  const {
    comments,
    newComment,
    setNewComment,
    likes,
    handleLike,
    handleSubmit,
  } = useSpotComments(initialComments)

  const scrollToRelated = () => {
    relatedRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-screen justify-center bg-spot-bg">
      <div className="w-full max-w-[360px] min-h-screen">
        <SpotPageHeader />
        <SpotVisual spot={displaySpot} />
        <SpotDetailCard spot={displaySpot} onMoreLegend={scrollToRelated} />

        <div className="space-y-5 px-4 pb-10 pt-2">
        <EntryStatus isAccessible={displaySpot.isAccessible} />

        <section className="rounded-xl border border-primary/30 bg-spot-surface/80 p-4">
          <HorrorStars level={displaySpot.horrorIndex} />
        </section>

        <SpotLocation spot={displaySpot} />

        {displaySpot.galleryImages.length > 0 && (
          <ImageGallery images={displaySpot.galleryImages} spotName={displaySpot.name} />
        )}

        <RelatedContentSection ref={relatedRef} />

        <SpotCommentsSection
          comments={comments}
          newComment={newComment}
          likes={likes}
          onNewCommentChange={setNewComment}
          onSubmit={handleSubmit}
          onLike={handleLike}
        />
        </div>
      </div>
    </div>
  )
}
