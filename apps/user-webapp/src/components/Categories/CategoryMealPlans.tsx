import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MealPlanCard } from "@user-webapp/components/Meal-plans/MealPlanCard";
import { MealPlan } from "@user-webapp/types/meal-plan";

interface CategoryMealPlansProps {
  mealPlans: MealPlan[];
  wishlistedPlans: number[];
  togglePlanWishlist: (id: number) => void;
}

export function CategoryMealPlans({ mealPlans, wishlistedPlans, togglePlanWishlist }: CategoryMealPlansProps) {
  return (
    <section className="mb-16 animate-fadeInUp delay-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Featured Meal Plans</h2>
        <Link href="/meal-plans" className="text-primary flex items-center text-sm font-medium">
          View all meal plans <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mealPlans.map(plan => (
          <MealPlanCard
            key={plan.id}
            plan={plan}
            isWishlisted={wishlistedPlans.includes(plan.id)}
            onWishlistToggle={togglePlanWishlist}
          />
        ))}
      </div>
    </section>
  );
}