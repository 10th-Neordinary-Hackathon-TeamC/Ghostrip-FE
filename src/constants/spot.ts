import type { GhostSpot, RelatedContent } from '../types/spot'
import type { RelatedContentDto, SpotDetailDto } from '../types/spotApi'

/** Spot API — GET /api/spot/{spotId}, POST /api/spot/{spotId}/image */
export const SPOT_API_PATH = {
  detail: (spotId: string | number) => `/api/spot/${spotId}`,
  image: (spotId: string | number) => `/api/spot/${spotId}/image`,
} as const

export const RELATED_CONTENT_SOURCE = 'YouTube' as const

/** 체감 공포도 UI (horrorIndex 1~5) */
export const HORROR_LABELS = ['', '약간 으스스', '좀 무서움', '꽤 무서움', '매우 무서움', '공포 극한'] as const

export const HORROR_COLORS = ['', '#ADABAA', '#787776', '#EF4444', '#7F1C1D', '#7F1C1D'] as const

/** API 미제공 UI 필드 — SpotInfo 표시용 */
export const SPOT_DISPLAY_META = {
  category: '심령스팟',
  rating: 4.5,
} as const

/** API fearLevel → UI horrorIndex (1~5) */
export function mapFearLevelToHorrorIndex(fearLevel: number): number {
  const level = fearLevel <= 1 ? fearLevel * 5 : fearLevel
  return Math.min(5, Math.max(1, Math.round(level)))
}

export function toGhostSpot(dto: SpotDetailDto): GhostSpot {
  const imageUrls = [...(dto.spotImageList ?? [])]
    .sort((a, b) => a.spotImageId - b.spotImageId)
    .map((img) => img.imageUrl)
    .filter(Boolean)

  return {
    id: String(dto.spotId),
    name: dto.name,
    imageUrl: imageUrls[0] ?? '',
    galleryImages: imageUrls,
    address: dto.kakaoPlace?.address ?? '',
    visitWarning: dto.visitWarning ?? '',
    viewCount: dto.viewCount,
    horrorIndex: mapFearLevelToHorrorIndex(dto.fearLevel),
    description: dto.description,
    kakaoPlaceUrl: dto.kakaoPlace?.kakaoPlaceUrl ?? undefined,
  }
}

export function toRelatedContent(dto: RelatedContentDto): RelatedContent {
  return {
    id: String(dto.relatedContentId),
    title: dto.title,
    thumbnailUrl: dto.thumbUrl,
    url: dto.youtubeUrl,
    source: RELATED_CONTENT_SOURCE,
  }
}
