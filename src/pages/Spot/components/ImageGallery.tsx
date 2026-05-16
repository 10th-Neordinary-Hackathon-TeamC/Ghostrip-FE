import { useState } from 'react'
import { Images, X } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  spotName: string
}

export function ImageGallery({ images, spotName }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <section className="space-y-2">
        <div className="flex items-center gap-2">
          <Images size={15} className="text-secondary" />
          <h2 className="text-base font-semibold text-white">현장 사진</h2>
          <span className="text-xs text-spot-dim">{images.length}장</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {images.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-video overflow-hidden rounded-xl border border-primary/40 bg-spot-surface"
            >
              <img
                src={url}
                alt={`${spotName} 사진 ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </section>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${spotName} 사진 확대`}
        >
          <button
            type="button"
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={20} />
          </button>
          <img
            src={images[lightboxIndex]}
            alt={`${spotName} 사진 ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-full rounded-xl border-2 border-secondary object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
