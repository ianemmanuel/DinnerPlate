// apps/user-webapp/src/components/Profile/ProfileTabs.tsx
'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@user-webapp/components/ui/tabs"
import { ActivityTab } from "@user-webapp/components/Profile/ActivityTab"
import { WishlistTab } from "@user-webapp/components/Profile/WishlistTab"
import { MealPlansTab } from "@user-webapp/components/Profile/MealplansTab"
import { FollowingTab } from "@user-webapp/components/Profile/FollowingTab"
import { CategoriesTab } from "@user-webapp/components/Profile/CategoriesTab"
import { DealsTab } from "@user-webapp/components/Profile/DealsTab"

export function ProfileTabs({
  favoriteMeals,
  wishlistIds,
  mealPlans,
  restaurants,
  categories,
  deals
}: {
  favoriteMeals: any
  wishlistIds: number[]
  mealPlans: any
  restaurants: any
  categories: any
  deals: any
}) {
  return (
    <Tabs defaultValue="activity" className="w-full">
      <TabsList className="w-full overflow-x-auto">
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="deals">Deals</TabsTrigger>
      </TabsList>
      <div className="mt-6 space-y-8">
        <TabsContent value="activity"><ActivityTab /></TabsContent>
        <TabsContent value="wishlist">
          <WishlistTab meals={favoriteMeals} wishlist={wishlistIds} />
        </TabsContent>
        <TabsContent value="meal-plans"><MealPlansTab plans={mealPlans} /></TabsContent>
        <TabsContent value="following"><FollowingTab restaurants={restaurants} /></TabsContent>
        <TabsContent value="categories"><CategoriesTab categories={categories} /></TabsContent>
        <TabsContent value="deals"><DealsTab deals={deals} /></TabsContent>
      </div>
    </Tabs>
  )
}