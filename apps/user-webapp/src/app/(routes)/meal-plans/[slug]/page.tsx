export const revalidate = 600;

import { notFound } from 'next/navigation';
import { getMealPlanDetails } from '@user-webapp/app/data/meal-plans';

import MealPlanGallery from '@user-webapp/components/Meal-plans/MealPlanGallery';
import MealPlanHeader from '@user-webapp/components/Meal-plans/MealPlanHeader';
import MealPlanMealsIncluded from '@user-webapp/components/Meal-plans/MealPlanMealsIncluded';
import MealPlanDetailsTabs from '@user-webapp/components/Meal-plans/MealPlanDetailsTabs';
import MealPlanRecommended from '@user-webapp/components/Meal-plans/MealPlanRecommended';

export default async function MealPlanDetails() {
  const plan = getMealPlanDetails()
  if (!plan) return notFound()

  const hasDiscount = !!(plan.originalPrice && plan.originalPrice !== plan.price);

  return (
    <div className="container py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MealPlanGallery
          name={plan.name}
          image={plan.image}
          gallery={plan.gallery}
          isPopular={plan.isPopular}
          isFeatured={plan.isFeatured}
          hasDiscount={hasDiscount}
        />
        <MealPlanHeader plan={plan} hasDiscount={hasDiscount} />
      </div>

      <MealPlanMealsIncluded meals={plan.meals} />
      <MealPlanDetailsTabs rating={plan.rating} reviews={plan.reviews} />
      <MealPlanRecommended />
    </div>
  );
}
