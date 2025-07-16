export type Festival = {
  id: number
  name: string
  image: string
  date: string
  time: string
  location: string
  organizer: string
  organizerSlug: string
  price: string
  ticketsLeft?: number
  isFeatured?: boolean
  isSponsored?: boolean
  isPlatformEvent?: boolean
  isAlmostSoldOut?: boolean
  isHappeningSoon?: boolean
  tags?: string[]
};

export type FestivalGridProps = {
  festivals: Festival[]
}