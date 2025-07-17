// apps/user-webapp/src/app/(routes)/profile/page.tsx
import { ProfileHeader } from "@user-webapp/components/Profile/ProfileHeader"
import { ProfileStats } from "@user-webapp/components/Profile/ProfileStats"
import { ProfileTabs } from "@user-webapp/components/Profile/ProfileTabs"
import { mealPlans } from "@user-webapp/app/data/meal-plans"
import { meals } from "@user-webapp/app/data/meals"
import { categories } from "@user-webapp/app/data/categories"
import { deals } from "@user-webapp/app/data/deals"
import { restaurants } from "@user-webapp/app/data/restaurants"

export const revalidate = 60

async function fetchProfileData() {
  return {
    stats: { wishlist: 12, savedDeals: 5, orders: 8, following: 7, preferredCategories: 4 },
    favoriteMeals: meals,
    wishlistIds: [1, 2, 3],
  }
}

export default async function Profile() {
  const { stats, favoriteMeals, wishlistIds } = await fetchProfileData()

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <ProfileHeader />
      <ProfileStats stats={stats} />
      <ProfileTabs
        favoriteMeals={favoriteMeals}
        wishlistIds={wishlistIds}
        mealPlans={mealPlans}
        restaurants={restaurants}
        categories={categories}
        deals={deals}
      />
    </div>
  )
}