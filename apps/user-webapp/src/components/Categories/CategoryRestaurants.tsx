import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RestaurantCard } from "@user-webapp/components/Restaurants/RestaurantCard";
import { Restaurant } from "@user-webapp/types/restaurant";

interface CategoryRestaurantsProps {
  restaurants: Restaurant[];
  favoriteRestaurants: number[];
  toggleRestaurantFavorite: (id: number) => void;
  categoryName: string;
}

export function CategoryRestaurants({ 
  restaurants, 
  favoriteRestaurants, 
  toggleRestaurantFavorite,
  categoryName
}: CategoryRestaurantsProps) {
  return (
    <section className="mb-16 animate-fadeInUp delay-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Restaurants Featuring {categoryName}</h2>
        <Link href="/restaurants" className="text-primary flex items-center text-sm font-medium">
          View all restaurants <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {restaurants.map(restaurant => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            isFavorite={favoriteRestaurants.includes(restaurant.id)}
            onToggleFavorite={toggleRestaurantFavorite}
          />
        ))}
      </div>
    </section>
  );
}