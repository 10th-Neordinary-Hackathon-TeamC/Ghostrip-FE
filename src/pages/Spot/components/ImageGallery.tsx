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
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Images size={15} className="text-gray-400" />
          <span className="text-sm text-gray-400">현장 사진</span>
          <span className="text-xs text-gray-600">{images.length}장</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {images.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-video overflow-hidden rounded-xl bg-gray-900"
            >
              <img
                src={url}
                alt={`${spotName} 사진 ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

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
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={20} />
          </button>
          <img
            src={images[lightboxIndex]}
            alt={`${spotName} 사진 ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex(i)
                }}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === lightboxIndex ? 'scale-125 bg-white' : 'bg-white/40'
                }`}
                aria-label={`${i + 1}번째 사진`}
              />
            ))}
          </div>
          </div>
      )}
    </>
  )
}
