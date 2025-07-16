export type MealPlan = {
  id: number
  name: string
  image: string
  price: string
  pricePer?: string
  subscribers: number
  restaurant: string
  restaurantSlug: string
  isPopular?: boolean
  isFeatured?: boolean
  isStartingSoon?: boolean
  cycles?: number
};

export type MealPlanGridProps = {
  plans: MealPlan[]
  wishlist: number[]
  onWishlistToggle: (id: number) => void
}