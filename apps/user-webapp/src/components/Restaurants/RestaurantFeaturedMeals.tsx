"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { MealCard } from "@user-webapp/components/Meals/MealCard"
import type { Meal } from "@user-webapp/types/meal"


interface Props {
  featuredMeals: Meal[]
  wishlistedMeals: number[]
  onWishlistToggle: (id: number) => void
}

export default function RestaurantFeaturedMeals({ featuredMeals, wishlistedMeals, onWishlistToggle }: Props) {
  return (
    <div className="animate-fadeInUp delay-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold font-serif">Featured Meals</h2>
        <Link href="#" className="text-sm text-primary hover:underline flex items-center gap-1">
          View all meals <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {featuredMeals.map((meal) => (
          <MealCard 
            key={meal.id}
            meal={meal}
            isWishlisted={wishlistedMeals.includes(meal.id)}
            onWishlistToggle={onWishlistToggle}
          />
        ))}
      </div>
    </div>
  )
}
