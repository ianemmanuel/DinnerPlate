import { RestaurantCard } from "./RestaurantCard"
import { RestaurantGridProps } from "@user-webapp/types/restaurant"

export function RestaurantGrid({ restaurants, favorites, onToggleFavorite }: RestaurantGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          isFavorite={favorites.includes(restaurant.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}