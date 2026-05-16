import { useState } from 'react'
import { Send } from 'lucide-react'
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
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = () => {
    if (!newComment.trim()) return
    onSubmit()
    setShowForm(false)
  }

  return (
    <section className="space-y-6 pb-2">
      <h2 className="text-base font-semibold text-white">방문 후기</h2>

      <div className="flex flex-col gap-7">
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

      {showForm && (
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => onNewCommentChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="방문 후기를 남겨보세요..."
            className="flex-1 rounded-xl border border-primary/40 bg-spot-input px-4 py-3 text-sm text-white placeholder:text-spot-dim focus:border-secondary focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!newComment.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowForm((prev) => !prev)}
        className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
      >
        {showForm ? '닫기' : '후기 작성하기'}
      </button>
    </section>
  )
}
