import { MealCard } from "@user-webapp/components/Meals/MealCard"
import { MealGridProps } from "@user-webapp/types/meal"

export function MealGrid({ meals, wishlist, onWishlistToggle }: MealGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          isWishlisted={wishlist.includes(meal.id)}
          onWishlistToggle={onWishlistToggle}
        />
      ))}
    </div>
  );
}