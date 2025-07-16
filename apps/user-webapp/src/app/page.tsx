import { Suspense } from "react";
import { categories, restaurants, mealPlans } from "@user-webapp/lib/data";
import HeroSection from "@user-webapp/components/Home/HeroSection"
import Slider from "@user-webapp/components/Home/Slider"
import HowItWorks from "@user-webapp/components/Home/HowItWorks"
import FeaturedPromotions from "@user-webapp/components/Home/FeaturedPromotions";

function SliderLoading() {
  return (
    <div className="container py-12 px-4 text-foreground">
      <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
      <div className="flex gap-6 overflow-x-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="min-w-[280px] h-64 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  
  return (
    <div className="flex flex-col text-foreground">
      <HeroSection />
      <FeaturedPromotions />
      <div className="mt-12">
        <Suspense fallback={<SliderLoading />}>
          <Slider title="Featured Meal Plans" items={mealPlans} viewAllHref="/meal-plans" itemType="mealPlan" />
        </Suspense>
        
        <Suspense fallback={<SliderLoading />}>
          <Slider title="Popular Categories" items={categories} viewAllHref="/categories" itemType="category" />
        </Suspense>

        <Suspense fallback={<SliderLoading />}>
          <Slider title="Popular Restaurants" items={restaurants} viewAllHref="/restaurants" itemType="restaurant" />
        </Suspense>

        <HowItWorks />
      </div>         
    </div>
  );
}