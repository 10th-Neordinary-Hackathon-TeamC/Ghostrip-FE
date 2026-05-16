import { SPOT_API_PATH, toGhostSpot, toRelatedContent } from '../constants/spot'
import type { GhostSpot, RelatedContent } from '../types/spot'
import type { SpotDetailDto } from '../types/spotApi'
import { apiClient } from './client'
import type { ApiResponse } from '../types/api'

export interface SpotDetailResult {
  spot: GhostSpot
  relatedContents: RelatedContent[]
}

export async function fetchSpotById(spotId: string): Promise<SpotDetailResult> {
  const { data } = await apiClient.get<ApiResponse<SpotDetailDto>>(SPOT_API_PATH.detail(spotId))

  if (!data.success || !data.data) {
    throw new Error(data.error?.message ?? '스팟 정보를 불러오지 못했습니다.')
  }

  return {
    spot: toGhostSpot(data.data),
    relatedContents: (data.data.relatedContentList ?? [])
      .filter((item) => Boolean(item.youtubeUrl))
      .map(toRelatedContent),
  }
}
