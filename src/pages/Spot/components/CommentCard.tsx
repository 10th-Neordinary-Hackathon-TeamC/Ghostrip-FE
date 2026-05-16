import type { SpotComment } from '../../../types/spot'

const AVATARS: Record<string, string> = {
  고스트헌터: '👻',
  공포덕후99: '💀',
  밤탐험가: '🔦',
}

interface CommentCardProps {
  comment: SpotComment
}

export function CommentCard({ comment }: CommentCardProps) {
  const avatar = AVATARS[comment.author] ?? '🌙'

  return (
    <article className="flex items-start gap-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-7 text-base"
        aria-hidden
      >
        {avatar}
      </div>

      <div className="min-w-0 flex-1 space-y-1 px-0.5 py-0.5">
        <p className="text-sm font-medium text-white">{comment.author}</p>
        <p className="text-sm leading-relaxed text-gray-2">{comment.content}</p>
        <p className="text-[11px] text-spot-dim">{comment.createdAt}</p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1 pt-0.5">
        {/* TODO(API): PATCH /api/comment/:commentId */}
        <button
          type="button"
          className="text-xs text-spot-dim transition-colors hover:text-gray-3"
        >
          수정
        </button>
        {/* TODO(API): DELETE /api/comment/:commentId */}
        <button
          type="button"
          className="text-xs text-spot-dim transition-colors hover:text-gray-3"
        >
          삭제
        </button>
      </div>
    </article>
  )
}
