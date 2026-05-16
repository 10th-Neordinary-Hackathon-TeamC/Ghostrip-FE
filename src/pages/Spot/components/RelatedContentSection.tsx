import { forwardRef } from 'react'
// TODO(API): props로 spotId 받아 GET /spots/:spotId/related-contents — RELATED_CONTENTS 제거
import { RELATED_CONTENTS } from '../../../constants/spot'

export const RelatedContentSection = forwardRef<HTMLElement>(function RelatedContentSection(
  _,
  ref,
) {
  return (
    <section ref={ref} id="related-content" className="scroll-mt-4 space-y-4">
      <h2 className="text-sm font-semibold text-white">관련 콘텐츠</h2>
      <div className="grid grid-cols-2 gap-3">
        {RELATED_CONTENTS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            className="group flex min-w-0 flex-col gap-2"
          >
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-7">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="space-y-0.5 px-0.5">
              <span className="block text-[10px] text-spot-dim">{item.source}</span>
              <p className="line-clamp-2 text-xs leading-snug text-gray-2">{item.title}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
})
