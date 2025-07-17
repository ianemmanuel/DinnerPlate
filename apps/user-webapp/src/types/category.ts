export type Category = {
  id: number
  name: string
  image: string
  itemCount: number
  restaurant: string
  isSpicy?: boolean
  isTrending?: boolean
  isSponsored?: boolean
  isPlatform?: boolean
  isNew?: boolean
  isHealthy?: boolean
  tags?: string[]
  createdAt?: string
  updatedAt?: string 
}

export type CategoryGridProps = {
  categories: Category[]
}