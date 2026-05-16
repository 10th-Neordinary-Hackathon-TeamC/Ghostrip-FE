import { ExternalLink } from 'lucide-react'
// TODO(API): props로 spotId 받아 GET /spots/:spotId/related-contents — RELATED_CONTENTS 제거
import { RELATED_CONTENTS } from '../../../constants/spot'

export function RelatedContentSection() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ExternalLink size={15} className="text-gray-400" />
        <span className="text-sm text-gray-400">관련 콘텐츠</span>
      </div>
      <div className="space-y-2">
        {/* TODO(API): relatedContents state (fetch 결과) */}
        {RELATED_CONTENTS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            className="group flex gap-3 overflow-hidden rounded-xl border border-gray-800 bg-gray-900/60 transition-colors hover:border-gray-600"
          >
            <div className="h-20 w-24 shrink-0 overflow-hidden">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center gap-1 py-3 pr-3">
              <span className="text-xs text-purple-400">{item.source}</span>
              <p className="line-clamp-2 text-sm leading-snug text-gray-200">{item.title}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
