import { useParams } from 'react-router-dom'
import { DUMMY_COMMENTS, DUMMY_SPOT } from '../../constants/spot'
import type { GhostSpot, SpotComment } from '../../types/spot'
import { EntryStatus } from './components/EntryStatus'
import { HorrorStars } from './components/HorrorStars'
import { SpotCommentsSection } from './components/SpotCommentsSection'
import { SpotDescription } from './components/SpotDescription'
import { SpotHero } from './components/SpotHero'
import { SpotInfo } from './components/SpotInfo'
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

  const {
    comments,
    newComment,
    setNewComment,
    likes,
    handleLike,
    handleSubmit,
  } = useSpotComments(initialComments)

  return (
    <div className="min-h-screen bg-black text-white">
      <SpotHero spot={displaySpot} />

      <div className="mx-auto -mt-2 max-w-lg space-y-6 px-4 pb-10">
        <SpotInfo spot={displaySpot} commentCount={comments.length} />
        <EntryStatus isAccessible={displaySpot.isAccessible} />

        <div className="space-y-4 rounded-xl border border-gray-800 bg-gray-900/60 p-5">
          <HorrorStars level={displaySpot.horrorIndex} />
        </div>

        <SpotDescription spot={displaySpot} />

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
