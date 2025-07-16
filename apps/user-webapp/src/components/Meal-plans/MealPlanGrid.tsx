import { MealPlanCard } from "./MealPlanCard"
import { MealPlanGridProps } from "@user-webapp/types/meal-plan"

export function MealPlanGrid({ plans, wishlist, onWishlistToggle }: MealPlanGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <MealPlanCard
          key={plan.id}
          plan={plan}
          isWishlisted={wishlist.includes(plan.id)}
          onWishlistToggle={onWishlistToggle}
        />
      ))}
    </div>
  );
}