import { Meal } from "@user-webapp/types/meal";


export const meals: Meal[] = [
  {
    id: 1,
    slug: "spicy-tuna-roll",
    name: "Spicy Tuna Roll",
    description:
      "Fresh tuna mixed with spicy mayo, wrapped in seaweed and sushi rice. Served with wasabi, pickled ginger, and soy sauce.",
    image: "https://images.pexels.com/photos/1893561/pexels-photo-1893561.jpeg",
    price: "$12.99",
    originalPrice: "$15.99",
    prepTime: "15-20 min",
    rating: 4.8,
    reviews: 124,
    restaurant: "Sushi Palace",
    restaurantSlug: "sushi-palace",
    category: "Japanese",
    tags: ["Spicy", "Sushi", "Fresh"],
    isPopular: true,
    isHealthy: true,
    isNew: false,
    isSponsored: false,
    variants: [
      { name: "Regular", price: "$12.99" },
      { name: "Large", price: "$16.99" }
    ],
    addOns: [
      { name: "Extra Spicy Mayo", price: "$0.99" },
      { name: "Avocado", price: "$1.50" },
      { name: "Extra Ginger", price: "$0.50" }
    ],
    mealPlans: [
      {
        id: 101,
        name: "Weekly Sushi Fix",
        image: "https://images.pexels.com/photos/28701163/pexels-photo-28701163.jpeg",
        price: "$49.99",
        pricePer: "/week",
        cycles: 4,
        subscribers: 42
      }
    ]
  },

  {
    id: 2,
    slug: "california-roll",
    name: "California Roll",
    description:
      "Classic California Roll made with imitation crab, avocado, and cucumber. Perfect for sushi beginners and lovers alike.",
    image: "https://images.pexels.com/photos/1291712/pexels-photo-1291712.jpeg",
    price: "$10.99",
    originalPrice: "$12.99",
    prepTime: "10-15 min",
    rating: 4.6,
    reviews: 88,
    restaurant: "Sushi Palace",
    restaurantSlug: "sushi-palace",
    category: "Japanese",
    tags: ["Crab", "Avocado", "Cool"],
    isPopular: true,
    isHealthy: false,
    isNew: true,
    isSponsored: false,
    variants: [
      { name: "6 Pieces", price: "$10.99" },
      { name: "12 Pieces", price: "$18.99" }
    ],
    addOns: [
      { name: "Extra Wasabi", price: "$0.50" },
      { name: "Cream Cheese", price: "$1.00" }
    ],
    mealPlans: [
      {
        id: 102,
        name: "Sushi Starter Plan",
        image: "https://images.pexels.com/photos/14969997/pexels-photo-14969997.jpeg",
        price: "$39.99",
        pricePer: "/week",
        cycles: 3,
        subscribers: 29
      }
    ]
  },

  {
    id: 3,
    slug: "dragon-roll",
    name: "Dragon Roll",
    description:
      "A deluxe roll featuring grilled eel, cucumber, and avocado, topped with unagi sauce and sesame seeds.",
    image: "https://images.pexels.com/photos/11485355/pexels-photo-11485355.jpeg",
    price: "$14.99",
    originalPrice: "$17.99",
    prepTime: "20-25 min",
    rating: 4.9,
    reviews: 102,
    restaurant: "Sushi Palace",
    restaurantSlug: "sushi-palace",
    category: "Japanese",
    tags: ["Eel", "Avocado", "Premium"],
    isPopular: true,
    isHealthy: true,
    isNew: false,
    isSponsored: true,
    variants: [
      { name: "Standard", price: "$14.99" },
      { name: "Extra Toppings", price: "$18.99" }
    ],
    addOns: [
      { name: "Eel Sauce", price: "$1.25" },
      { name: "Tempura Flakes", price: "$0.75" },
      { name: "Pickled Radish", price: "$0.90" }
    ],
    mealPlans: [
      {
        id: 103,
        name: "Premium Sushi Experience",
        image: "https://images.pexels.com/photos/16825489/pexels-photo-16825489.jpeg",
        price: "$69.99",
        pricePer: "/week",
        cycles: 5,
        subscribers: 64
      }
    ]
  }
];



export const getMealDetails = () => {
  return {
    id: 1,
    slug: "spicy-tuna-roll",
    name: "Spicy Tuna Roll",
    description:
      "Fresh tuna mixed with spicy mayo, wrapped in seaweed and sushi rice. Served with wasabi, pickled ginger, and soy sauce.",
    image: "https://images.pexels.com/photos/1893561/pexels-photo-1893561.jpeg",
    gallery: [
      "https://images.pexels.com/photos/2116091/pexels-photo-2116091.jpeg",
      "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg",
      "https://images.pexels.com/photos/842142/pexels-photo-842142.jpeg",
      "https://images.pexels.com/photos/8964567/pexels-photo-8964567.jpeg"
    ],
    price: "$12.99",
    originalPrice: "$15.99",
    prepTime: "15-20 min",
    rating: 4.8,
    reviews: 124,
    restaurant: "Sushi Palace",
    restaurantSlug: "sushi-palace",
    category: "Japanese",
    tags: ["Spicy", "Sushi", "Fresh"],
    isPopular: true,
    isHealthy: true,
    isNew: false,
    isSponsored: false,
    variants: [
      { name: "Regular", price: "$12.99" },
      { name: "Large", price: "$16.99" }
    ],
    addOns: [
      { name: "Extra Spicy Mayo", price: "$0.99" },
      { name: "Avocado", price: "$1.50" },
      { name: "Extra Ginger", price: "$0.50" }
    ],
    mealPlans: [
      {
        id: 101,
        name: "Weekly Sushi Fix",
        image: "https://images.pexels.com/photos/16825489/pexels-photo-16825489.jpeg",
        price: "$49.99",
        pricePer: "/week",
        cycles: 4,
        subscribers: 42
      }
    ]
  }
}

export const getRecommendedMeals = (): Meal[] => [
  {
    id: 2,
    slug: 'california-roll',
    name: 'California Roll',
    description: 'Crab, avocado, and cucumber roll – fresh and simple.',
    image: 'https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg',
    price: '$10.99',
    prepTime: '10-15 min',
    rating: 4.6,
    reviews: 88,
    restaurant: 'Sushi Palace',
    restaurantSlug: 'sushi-palace',
    category: 'Japanese',
    tags: ['Crab', 'Avocado'],
    isPopular: true
  },
  {
    id: 3,
    slug: 'chilaquiles',
    name: 'Chilaquiles',
    description: 'Eel and cucumber roll topped with avocado and unagi sauce.',
    image: 'https://images.pexels.com/photos/1860204/pexels-photo-1860204.jpeg',
    price: '$14.99',
    prepTime: '20-25 min',
    rating: 4.9,
    reviews: 102,
    restaurant: 'Mexican hub',
    restaurantSlug: 'mexican-hub',
    category: 'Mexican',
    tags: ['Eel', 'Special'],
    isNew: true
  }
];

