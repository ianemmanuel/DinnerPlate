"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { MealPlanCard } from "@user-webapp/components/Meal-plans/MealPlanCard"

interface MealPlan {
  id: number
  name: string
  image: string
  price: string
  subscribers: number
  restaurant: string
  restaurantSlug: string
  isPopular: boolean
  isFeatured: boolean
  isStartingSoon: boolean
  pricePer: string
  cycles: number
}

interface Props {
  featuredMealPlans: MealPlan[]
  wishlistedPlans: number[]
  onWishlistToggle: (id: number) => void
}

export default function RestaurantFeaturedMealPlans({ featuredMealPlans, wishlistedPlans, onWishlistToggle }: Props) {
  return (
    <div className="animate-fadeInUp delay-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold font-serif">Meal Plans</h2>
        <Link href="#" className="text-sm text-primary hover:underline flex items-center gap-1">
          View all plans <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {featuredMealPlans.map((plan) => (
          <MealPlanCard 
            key={plan.id}
            plan={plan}
            isWishlisted={wishlistedPlans.includes(plan.id)}
            onWishlistToggle={onWishlistToggle}
          />
        ))}
      </div>
    </div>
  )
}
