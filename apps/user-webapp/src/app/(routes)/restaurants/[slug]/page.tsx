"use client"

import { useState } from "react"
import RestaurantHero from "@user-webapp/components/Restaurants/RestaurantHero"
import RestaurantInfo from "@user-webapp/components/Restaurants/RestaurantInfo"
import RestaurantAbout from "@user-webapp/components/Restaurants/RestaurantAbout"
import RestaurantGallery from "@user-webapp/components/Restaurants/RestaurantGallery"
import RestaurantFeaturedMeals from "@user-webapp/components/Restaurants/RestaurantFeaturedMeals"
import RestaurantFeaturedMealPlans from "@user-webapp/components/Restaurants/RestaurantFeaturedMealplans"
import RestaurantLocations from "@user-webapp/components/Restaurants/RestaurantLocations"
import RestaurantRating from "@user-webapp/components/Restaurants/RestaurantRating"
import RestaurantDeals from "@user-webapp/components/Restaurants/RestaurantDeals"
import RestaurantAchievements from "@user-webapp/components/Restaurants/RestaurantAchievements"
import RestaurantUpdates from "@user-webapp/components/Restaurants/RestaurantUpdates"

import { openingSchedule, restaurant } from "@user-webapp/app/data/restaurants" 
import RestaurantOpeningHours from "@user-webapp/components/Restaurants/RestaurantOpendingHours"

export default function RestaurantProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [wishlistedMeals, setWishlistedMeals] = useState<number[]>([])
  const [wishlistedPlans, setWishlistedPlans] = useState<number[]>([])

  const handleMealWishlistToggle = (id: number) => {
    setWishlistedMeals((prev) =>
      prev.includes(id) ? prev.filter((mealId) => mealId !== id) : [...prev, id]
    )
  }

  const handlePlanWishlistToggle = (id: number) => {
    setWishlistedPlans((prev) =>
      prev.includes(id) ? prev.filter((planId) => planId !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <RestaurantHero
        name={restaurant.name}
        coverImage={restaurant.coverImage}
        profileImage={restaurant.profileImage}
      />
      <div className="container px-4 md:px-6 py-8 mt-20">
        <RestaurantInfo
          name={restaurant.name}
          rating={restaurant.rating}
          reviews={restaurant.reviews}
          hours={restaurant.hours}
          social={restaurant.social}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
        />
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <RestaurantAbout
              description={restaurant.description}
              phone={restaurant.phone}
              email={restaurant.email}
            />
            <RestaurantGallery
              images={restaurant.images}
              name={restaurant.name}
            />
            <RestaurantFeaturedMeals
              featuredMeals={restaurant.featuredMeals}
              wishlistedMeals={wishlistedMeals}
              onWishlistToggle={handleMealWishlistToggle}
            />
            <RestaurantFeaturedMealPlans
              featuredMealPlans={restaurant.featuredMealPlans}
              wishlistedPlans={wishlistedPlans}
              onWishlistToggle={handlePlanWishlistToggle}
            />
            <RestaurantLocations
              branches={restaurant.branches}
            />
          </div>
          <div className="space-y-6">
            <RestaurantRating
              userRating={userRating}
              setUserRating={setUserRating}
            />
            <RestaurantDeals
              deals={restaurant.deals}
            />
            <RestaurantAchievements
              achievements={restaurant.achievements}
            />
            <RestaurantUpdates
              updates={restaurant.updates}
            />
            <RestaurantOpeningHours schedule={openingSchedule} />
          </div>
        </div>
      </div>
    </div>
  )
}
