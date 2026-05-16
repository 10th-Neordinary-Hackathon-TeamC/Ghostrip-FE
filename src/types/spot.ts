export interface GhostSpot {
  id: string
  name: string
  imageUrl: string
  galleryImages: string[]
  address: string
  isAccessible: boolean
  horrorIndex: number
  description: string
}

export interface RelatedContent {
  id: string
  title: string
  thumbnailUrl: string
  url: string
  source: string
}

export interface SpotComment {
  id: string
  author: string
  content: string
  createdAt: string
}
