import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MealCard } from "@user-webapp/components/Meals/MealCard";
import { Meal } from "@user-webapp/types/meal";

interface CategoryMealsProps {
  meals: Meal[];
  wishlistedMeals: number[];
  toggleMealWishlist: (id: number) => void;
}

export function CategoryMeals({ meals, wishlistedMeals, toggleMealWishlist }: CategoryMealsProps) {
  return (
    <section className="mb-16 animate-fadeInUp delay-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Featured Meals</h2>
        <Link href="/meals" className="text-primary flex items-center text-sm font-medium">
          View all meals <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {meals.map(meal => (
          <MealCard
            key={meal.id}
            meal={meal}
            isWishlisted={wishlistedMeals.includes(meal.id)}
            onWishlistToggle={toggleMealWishlist}
          />
        ))}
      </div>
    </section>
  );
}