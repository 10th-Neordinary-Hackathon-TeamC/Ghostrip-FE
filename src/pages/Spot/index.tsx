import { useRef } from 'react'
import { useParams } from 'react-router-dom'
// TODO(API): DUMMY_SPOT 제거 후 apiClient로 fetch
import { DUMMY_SPOT } from '../../constants/spot'
import type { GhostSpot } from '../../types/spot'
import { EntryStatus } from './components/EntryStatus'
import { HorrorStars } from './components/HorrorStars'
import { SpotCommentsSection } from './components/SpotCommentsSection'
import { ImageGallery } from './components/ImageGallery'
import { RelatedContentSection } from './components/RelatedContentSection'
import { SpotDetailCard } from './components/SpotDetailCard'
import { SpotPageHeader } from './components/SpotPageHeader'
import { SpotVisual } from './components/SpotVisual'
import { useSpotComments } from './hooks/useSpotComments'

interface SpotPageProps {
  spot?: GhostSpot
}

export default function SpotPage({ spot = DUMMY_SPOT }: SpotPageProps) {
  const { spotId } = useParams<{ spotId: string }>()
  const displaySpot = { ...spot, id: spotId ?? spot.id }
  const relatedRef = useRef<HTMLElement>(null)

  const {
    comments,
    newComment,
    setNewComment,
    isLoading,
    isSubmitting,
    error,
    submitError,
    handleSubmit,
  } = useSpotComments(spotId ?? displaySpot.id)

  const scrollToRelated = () => {
    relatedRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-screen justify-center bg-black">
      <div className="spot-scroll w-full max-w-[360px] min-h-screen bg-black">
        <div className="relative">
          <div className="absolute top-0 right-0 left-0 z-10">
            <SpotPageHeader />
          </div>
          <SpotVisual spot={displaySpot} />
        </div>

        <div className="flex flex-col gap-5 px-5 pb-14 pt-5">
          <SpotDetailCard spot={displaySpot} onMoreLegend={scrollToRelated} />

          <EntryStatus isAccessible={displaySpot.isAccessible} />

          <HorrorStars level={displaySpot.horrorIndex} />

          <ImageGallery images={displaySpot.galleryImages} spotName={displaySpot.name} />

          <RelatedContentSection ref={relatedRef} />

          <SpotCommentsSection
            comments={comments}
            newComment={newComment}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            error={error}
            submitError={submitError}
            onNewCommentChange={setNewComment}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
