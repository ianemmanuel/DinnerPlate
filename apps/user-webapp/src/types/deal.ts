export type DealType = 'meal' | 'meal-plan' | 'restaurant' | 'category' | 'festival'

export type Deal = {
  id: number
  title: string
  description: string
  discount: string
  code?: string
  image: string
  type: DealType
  applicableTo?: string
  applicableToSlug?: string
  expires?: string
  isFeatured?: boolean
  isNew?: boolean
  isAlmostExpired?: boolean
}

export type DealGridProps = {
  deals: Deal[]
}