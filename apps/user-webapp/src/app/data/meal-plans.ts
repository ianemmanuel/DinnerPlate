import { MealPlan } from "@user-webapp/types/meal-plan"

export const mealPlans: MealPlan[] = [
  {
    id: 1,
    name: "Weekly Clean Eating",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    price: "$89",
    pricePer: "per week",
    subscribers: 142,
    restaurant: "Green Bowl",
    restaurantSlug: "green-bowl",
    isPopular: true,
    isFeatured: true,
    cycles: 4
  },
  {
    id: 2,
    name: "Muscle Gain Starter",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    price: "$120",
    subscribers: 89,
    restaurant: "Protein House",
    restaurantSlug: "protein-house",
    isStartingSoon: true
  },
  {
    id: 3,
    name: "Mediterranean Lifestyle",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
    price: "$75",
    pricePer: "per week",
    subscribers: 210,
    restaurant: "Olive Tree",
    restaurantSlug: "olive-tree",
    isPopular: true,
    cycles: 12
  },
  {
    id: 4,
    name: "Quick Lunch Series",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    price: "$65",
    subscribers: 56,
    restaurant: "Urban Bites",
    restaurantSlug: "urban-bites",
    isFeatured: true
  },
  {
    id: 5,
    name: "Plant-Based Beginner",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947",
    price: "$95",
    pricePer: "per week",
    subscribers: 178,
    restaurant: "Veggie Patch",
    restaurantSlug: "veggie-patch",
    isPopular: true,
    cycles: 8
  },
  {
    id: 6,
    name: "Family Dinner Plan",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
    price: "$150",
    subscribers: 42,
    restaurant: "Home Kitchen",
    restaurantSlug: "home-kitchen",
    isStartingSoon: true
  }
]

export const getMealPlanDetails = () => {
  return {
    id: 101,
    slug: "weekly-steak-fix",
    name: "Weekly Steak Fix",
    description: "Get your sushi craving satisfied every week...",
    image: "https://images.pexels.com/photos/20150372/pexels-photo-20150372.jpeg",
    gallery: [
      "https://images.pexels.com/photos/29333559/pexels-photo-29333559.jpeg",
      "https://images.pexels.com/photos/28292009/pexels-photo-28292009.jpeg",
      "https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg"
    ],
    price: "$49.99",
    originalPrice: "$59.99",
    pricePer: "/week",
    cycles: 4,
    subscribers: 42,
    rating: 4.7,
    reviews: 28,
    restaurant: "Sushi Palace",
    restaurantSlug: "sushi-palace",
    deliveryWindow: "6:00 PM - 7:00 PM",
    deliveryDays: ["Monday", "Wednesday", "Friday"],
    isPopular: true,
    isFeatured: true,
    isStartingSoon: false,
    meals: [
      // your meals here...
    ]
  };
}

export const getRecommendedMealPlans = () => {
  return [
    {
      id: 2,
      name: "Protein-Rich Plan",
      image: "https://images.pexels.com/photos/29333564/pexels-photo-29333564.jpeg",
      price: "$99.99",
      originalPrice: "$119.99",
      pricePer: "per week",
      duration: "7 days",
      rating: 4.6,
      subscribers: 75,
      restaurant: "Protein House",
      restaurantSlug: "protein-house",
      cycles: 4
    },
    {
      id: 3,
      name: "Mediterranean Plan",
      image: "https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg",
      price: "$79.99",
      originalPrice: "$99.99",
      pricePer: "per week",
      duration: "5 days",
      rating: 4.8,
      subscribers: 112,
      restaurant: "Olive Tree",
      restaurantSlug: "olive-tree",
      cycles: 8
    }
  ]
}