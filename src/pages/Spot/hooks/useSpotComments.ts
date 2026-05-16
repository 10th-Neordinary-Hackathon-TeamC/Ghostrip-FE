import { useState } from 'react'
import type { SpotComment } from '../../../types/spot'

interface LikeState {
  [id: string]: { liked: boolean; count: number }
}

// TODO(API): GET /spots/:spotId/comments 응답의 likeCount, isLiked로 초기화
function createInitialLikes(comments: SpotComment[]): LikeState {
  return Object.fromEntries(comments.map((c) => [c.id, { liked: false, count: 0 }]))
}

export function useSpotComments(initialComments: SpotComment[]) {
  const [comments, setComments] = useState<SpotComment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [likes, setLikes] = useState<LikeState>(() => createInitialLikes(initialComments))

  // TODO(API): POST /spots/:spotId/comments/:commentId/like (또는 DELETE) — 성공 후 setLikes
  const handleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: {
        liked: !prev[id].liked,
        count: prev[id].liked ? prev[id].count - 1 : prev[id].count + 1,
      },
    }))
  }

  // TODO(API): POST /spots/:spotId/comments { content } — 응답 본문으로 목록 갱신
  const handleSubmit = () => {
    if (!newComment.trim()) return

    const newId = `c${Date.now()}`
    const comment: SpotComment = {
      id: newId,
      author: '익명 탐험가', // TODO(API): 로그인 사용자 닉네임 또는 API 응답 author
      content: newComment.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    }

    setComments((prev) => [comment, ...prev])
    setLikes((prev) => ({ ...prev, [newId]: { liked: false, count: 0 } }))
    setNewComment('')
  }

  return {
    comments,
    newComment,
    setNewComment,
    likes,
    handleLike,
    handleSubmit,
  }
}
