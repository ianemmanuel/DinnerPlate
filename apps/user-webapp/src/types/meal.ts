export type MealVariant = {
  name: string;
  price: string;
};

export type MealAddOn = {
  name: string;
  price: string;
};

export type MealPlanPreview = {
  id: number;
  name: string;
  image: string;
  price: string;
  pricePer: string;
  cycles: number;
  subscribers: number;
};

export type Meal = {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  gallery?: string[]
  price: string;
  originalPrice?: string;
  prepTime: string;
  rating: number;
  reviews: number;
  restaurant: string;
  restaurantSlug: string;
  category: string;
  tags: string[];
  isPopular?: boolean;
  isHealthy?: boolean;
  isNew?: boolean;
  isSponsored?: boolean;
  variants?: MealVariant[];
  addOns?: MealAddOn[];
  mealPlans?: MealPlanPreview[];
};


export type MealGridProps = {
  meals: Meal[]
  wishlist: number[]
  onWishlistToggle: (id: number) => void
}



// export type Meal = {
//   id: number;
//   slug: string;
//   name: string;
//   description: string;
//   image: string;
//   price: string;
//   originalPrice?: string;
//   prepTime: string;
//   rating: number;
//   reviews: number;
//   restaurant: string;
//   restaurantSlug: string;
//   category: string;
//   tags: string[];
//   isPopular: boolean;
//   isHealthy: boolean;
//   isNew: boolean;
//   isSponsored: boolean;
//   variants?: MealVariant[];
//   addOns?: MealAddOn[];
//   mealPlans?: MealPlanPreview[];
// };
