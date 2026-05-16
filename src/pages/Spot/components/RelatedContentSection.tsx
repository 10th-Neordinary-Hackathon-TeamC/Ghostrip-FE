import { forwardRef } from 'react'
import { ExternalLink } from 'lucide-react'
// TODO(API): props로 spotId 받아 GET /spots/:spotId/related-contents — RELATED_CONTENTS 제거
import { RELATED_CONTENTS } from '../../../constants/spot'

export const RelatedContentSection = forwardRef<HTMLElement>(function RelatedContentSection(
  _,
  ref,
) {
  return (
    <section ref={ref} id="related-content" className="scroll-mt-4 space-y-5">
      <div className="flex items-center gap-2">
        <ExternalLink size={15} className="text-secondary" />
        <h2 className="text-base font-semibold text-white">관련 콘텐츠</h2>
      </div>
      <div className="space-y-4">
        {RELATED_CONTENTS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            className="group flex gap-4 overflow-hidden rounded-xl border border-primary/30 bg-spot-surface/80 p-3 transition-colors hover:border-secondary/50"
          >
            <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="spot-text-box flex min-w-0 flex-1 flex-col justify-center gap-1.5">
              <span className="text-xs font-medium text-secondary">{item.source}</span>
              <p className="line-clamp-2 text-sm leading-snug text-gray-2">{item.title}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
})
