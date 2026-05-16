import { MessageCircle, Send } from 'lucide-react'
import type { SpotComment } from '../../../types/spot'
import { CommentCard } from './CommentCard'

interface SpotCommentsSectionProps {
  comments: SpotComment[]
  newComment: string
  likes: Record<string, { liked: boolean; count: number }>
  onNewCommentChange: (value: string) => void
  onSubmit: () => void
  onLike: (id: string) => void
}

export function SpotCommentsSection({
  comments,
  newComment,
  likes,
  onNewCommentChange,
  onSubmit,
  onLike,
}: SpotCommentsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base text-white">
          <MessageCircle size={16} className="text-purple-400" />
          방문 후기
        </h2>
        <span className="text-xs text-gray-500">{comments.length}개</span>
      </div>

      <div className="flex gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-800 text-base">
          🌙
        </div>
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => onNewCommentChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
            placeholder="방문 후기를 남겨보세요..."
            className="flex-1 rounded-xl border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors focus:border-purple-600 focus:outline-none"
          />
          <button
            type="button"
            onClick={onSubmit}
            disabled={!newComment.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-700 text-white transition-colors hover:bg-purple-600 disabled:bg-gray-800 disabled:text-gray-600"
          >
            <Send size={15} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            liked={likes[comment.id]?.liked ?? false}
            likeCount={likes[comment.id]?.count ?? 0}
            onLike={() => onLike(comment.id)}
          />
        ))}
      </div>
    </div>
  )
}
