export const revalidate = 600;

import { notFound } from 'next/navigation';
import { getMealDetails } from '@user-webapp/app/data/meals';

import MealGallery from '@user-webapp/components/Meals/MealGallery';
import MealHeader from '@user-webapp/components/Meals/MealHeader';
import MealVariants from '@user-webapp/components/Meals/MealVariants';
import MealAddOns from '@user-webapp/components/Meals/MealAddOns'
import MealTabs from '@user-webapp/components/Meals/MealTabs';
import MealPlanSuggestions from '@user-webapp/components/Meals/MealPlanSuggestions';
import MealRecommended from '@user-webapp/components/Meals/MealRecommended';
import { Button } from '@user-webapp/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';

export default async function MealDetailsPage() {
  const meal = getMealDetails();
  if (!meal) return notFound();

  const hasDiscount = !!(meal.originalPrice && meal.originalPrice !== meal.price);

  return (
    <div className="container py-8 px-4 space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Gallery */}
        <MealGallery meal={meal} hasDiscount={hasDiscount} />

        {/* Right: Header + Variants + Add-ons + Actions */}
        <div className="space-y-6">
          <MealHeader meal={meal} hasDiscount={hasDiscount} />

          {meal.variants?.length > 1 && <MealVariants variants={meal.variants} />}
          {meal.addOns?.length > 0 && <MealAddOns addOns={meal.addOns} />}
          <div className="flex gap-4 pt-4">
            {/* Add to Cart */}
            <Button
              size="lg"
              className="flex-1 gap-2 cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </Button>

            {/* Order Now */}
            <Button
              size="lg"
              variant="secondary"
              className="flex-1 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
            >
              Order Now
            </Button>

            {/* Wishlist (Heart Icon) */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full cursor-pointer shadow-sm hover:shadow-md hover:scale-110 transition-transform duration-200"
              aria-label="Add to wishlist"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
          {meal.mealPlans?.length > 0 && <MealPlanSuggestions plans={meal.mealPlans} />}
          {/* Action buttons can go here if you want */}
        </div>
      </div>
      <MealTabs meal={meal} />
      <MealRecommended />
    </div>
  );
}
