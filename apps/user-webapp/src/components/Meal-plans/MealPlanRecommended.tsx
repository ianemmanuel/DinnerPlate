

'use client'

import { Star } from 'lucide-react'
import { MealPlanCard } from '@user-webapp/components/Meal-plans/MealPlanCard'
import { getRecommendedMealPlans } from '@user-webapp/app/data/meal-plans'


export default function MealPlanRecommended() {
    const recommendedPlans = getRecommendedMealPlans()
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                Other plans you might like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedPlans.map((plan) => (
                <MealPlanCard
                    key={plan.id}
                    plan={plan}
                    isWishlisted={false}
                    onWishlistToggle={() => {}}
                />
                ))}
            </div>
        </div>
  )
}
