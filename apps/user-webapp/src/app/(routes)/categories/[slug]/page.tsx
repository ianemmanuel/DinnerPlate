"use client"

import { useState } from "react"
import { CategoryHero } from "@user-webapp/components/Categories/CategoryHero"
import { CategoryInfo } from "@user-webapp/components/Categories/CategoryInfo"
import { CategoryMeals } from "@user-webapp/components/Categories/CategoryMeals"
import { CategoryMealPlans } from "@user-webapp/components/Categories/CategoryMealPlans"
import { CategoryDeals } from "@user-webapp/components/Categories/CategoryDeals"
import { CategoryRestaurants } from "@user-webapp/components/Categories/CategoryRestaurants"
import { SimilarCategories } from "@user-webapp/components/Categories/SimilarCategories"
import { CategoryCTA } from "@user-webapp/components/Categories/CategoryCTA"
import { meals } from "@user-webapp/app/data/meals"
import { mealPlans } from "@user-webapp/app/data/meal-plans"
import { deals } from "@user-webapp/app/data/deals"
import { restaurants } from "@user-webapp/app/data/restaurants"
import { similarCategories, category } from "@user-webapp/app/data/categories"

export default function CategoryDetailsPage() {
  const [wishlistedMeals, setWishlistedMeals] = useState<number[]>([])
  const [wishlistedPlans, setWishlistedPlans] = useState<number[]>([])
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<number[]>([])

  const toggleMealWishlist = (id: number) => {
    setWishlistedMeals(prev => 
      prev.includes(id) ? prev.filter(mealId => mealId !== id) : [...prev, id]
    )
  }

  const togglePlanWishlist = (id: number) => {
    setWishlistedPlans(prev => 
      prev.includes(id) ? prev.filter(planId => planId !== id) : [...prev, id]
    )
  }

  const toggleRestaurantFavorite = (id: number) => {
    setFavoriteRestaurants(prev => 
      prev.includes(id) ? prev.filter(restId => restId !== id) : [...prev, id]
    )
  } 

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHero category={category} />
      <CategoryInfo category={category} />
      
      <CategoryMeals 
        meals={meals} 
        wishlistedMeals={wishlistedMeals} 
        toggleMealWishlist={toggleMealWishlist} 
      />
      
      <CategoryMealPlans 
        mealPlans={mealPlans} 
        wishlistedPlans={wishlistedPlans} 
        togglePlanWishlist={togglePlanWishlist} 
      />
      
      <CategoryDeals deals={deals} />
      
      <CategoryRestaurants 
        restaurants={restaurants} 
        favoriteRestaurants={favoriteRestaurants} 
        toggleRestaurantFavorite={toggleRestaurantFavorite} 
        categoryName={category.name}
      />
      
      <SimilarCategories similarCategories={similarCategories} />
      <CategoryCTA categoryName={category.name} />
    </div>
  );
}