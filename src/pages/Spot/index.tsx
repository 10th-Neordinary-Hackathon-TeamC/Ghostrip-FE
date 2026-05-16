import { useParams } from 'react-router-dom'
// TODO(API): DUMMY_* 제거 후 apiClient로 fetch
import { DUMMY_COMMENTS, DUMMY_SPOT } from '../../constants/spot'
import type { GhostSpot, SpotComment } from '../../types/spot'
import { EntryStatus } from './components/EntryStatus'
import { HorrorStars } from './components/HorrorStars'
import { SpotCommentsSection } from './components/SpotCommentsSection'
import { ImageGallery } from './components/ImageGallery'
import { RelatedContentSection } from './components/RelatedContentSection'
import { SpotDescription } from './components/SpotDescription'
import { SpotHero } from './components/SpotHero'
import { SpotInfo } from './components/SpotInfo'
import { useSpotComments } from './hooks/useSpotComments'

interface SpotPageProps {
  spot?: GhostSpot
  initialComments?: SpotComment[]
}

export default function SpotPage({
  // TODO(API): GET /spots/:spotId — 명소 상세 (name, imageUrl, galleryImages, address, isAccessible, horrorIndex, description)
  spot = DUMMY_SPOT,
  // TODO(API): GET /spots/:spotId/comments — 방문 후기 목록 (좋아요 수·내 좋아요 여부 포함 시 useSpotComments 초기값에 반영)
  initialComments = DUMMY_COMMENTS,
}: SpotPageProps) {
  const { spotId } = useParams<{ spotId: string }>()
  // TODO(API): spotId로 조회한 데이터 사용. 아래 spread는 더미 id 덮어쓰기용 임시 처리
  const displaySpot = { ...spot, id: spotId ?? spot.id }

  const {
    comments,
    newComment,
    setNewComment,
    likes,
    handleLike,
    handleSubmit,
  } = useSpotComments(initialComments) // TODO(API): spotId 전달 — POST 댓글·좋아요 시 사용

  return (
    <div className="min-h-screen bg-black text-white">
      {/* displaySpot.imageUrl, galleryImages.length — GET /spots/:spotId */}
      <SpotHero spot={displaySpot} />

      <div className="mx-auto -mt-2 max-w-lg space-y-6 px-4 pb-10">
        {/* displaySpot.name, address / commentCount — comments API */}
        <SpotInfo spot={displaySpot} commentCount={comments.length} />
        {/* displaySpot.isAccessible */}
        <EntryStatus isAccessible={displaySpot.isAccessible} />

        <div className="space-y-4 rounded-xl border border-gray-800 bg-gray-900/60 p-5">
          {/* displaySpot.horrorIndex */}
          <HorrorStars level={displaySpot.horrorIndex} />
        </div>

        {/* displaySpot.description */}
        <SpotDescription spot={displaySpot} />

        {/* displaySpot.galleryImages */}
        {displaySpot.galleryImages.length > 0 && (
          <ImageGallery images={displaySpot.galleryImages} spotName={displaySpot.name} />
        )}

        {/* TODO(API): spotId — GET /spots/:spotId/related-contents */}
        <RelatedContentSection />

        {/* comments, likes — GET/POST /spots/:spotId/comments */}
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
  )
}
