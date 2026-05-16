import { Star, ThumbsUp } from 'lucide-react'
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
    <article className="space-y-2 border-b border-primary/20 pb-4 last:border-0 last:pb-0">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-spot-surface text-lg">
          {avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">{comment.author}</p>
          <p className="text-xs text-spot-dim">{comment.createdAt}</p>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className="fill-secondary/80 text-secondary/80" />
          ))}
        </div>
      </div>
      <p className="text-sm leading-relaxed text-spot-muted">{comment.content}</p>
      <button
        type="button"
        onClick={onLike}
        className={`flex items-center gap-1.5 text-xs transition-colors ${
          liked ? 'text-secondary' : 'text-spot-dim hover:text-spot-muted'
        }`}
      >
        <ThumbsUp size={12} />
        <span>{likeCount}</span>
      </button>
    </article>
  )
}
