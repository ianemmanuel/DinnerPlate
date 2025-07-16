export type Restaurant = {
  id: number
  name: string
  cuisine: string
  rating: number
  reviews: number
  deliveryTime: string
  openingTime: string
  closingTime: string
  isOpen: boolean
  image: string
  location: string
  price: string
  featured: boolean
  sponsored: boolean
  trending: boolean
  tags: string[]
}

export type RestaurantGridProps = {
  restaurants: Restaurant[]
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

export interface RestaurantCardProps {
  restaurant: Restaurant
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}