import { ThumbsUp } from 'lucide-react'
import type { SpotComment } from '../../../types/spot'

const AVATARS: Record<string, string> = {
  고스트헌터: '👻',
  공포덕후99: '💀',
  밤탐험가: '🔦',
}

interface CommentCardProps {
  comment: SpotComment
  liked: boolean
  likeCount: number
  onLike: () => void
}

export function CommentCard({ comment, liked, likeCount, onLike }: CommentCardProps) {
  const avatar = AVATARS[comment.author] ?? '🌙'

  return (
    <div className="space-y-3 rounded-xl border border-gray-800 bg-gray-900/60 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-lg">
          {avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white">{comment.author}</p>
          <p className="text-xs text-gray-500">{comment.createdAt}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-gray-300">{comment.content}</p>
      <button
        type="button"
        onClick={onLike}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all ${
          liked
            ? 'border-red-700/50 bg-red-950/50 text-red-400'
            : 'border-gray-700 bg-gray-800/50 text-gray-500 hover:text-gray-300'
        }`}
      >
        <ThumbsUp size={12} />
        <span>{likeCount}</span>
      </button>
    </div>
  )
}
