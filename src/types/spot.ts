export interface GhostSpot {
  id: string
  name: string
  imageUrl: string
  isAccessible: boolean
  horrorIndex: number
  description: string
}

export interface SpotComment {
  id: string
  author: string
  content: string
  createdAt: string
}
