import { Category } from "@user-webapp/types/category"

export const categories: Category[] = [
  {
    id: 1,
    name: "Spicy Specials",
    image: "https://images.pexels.com/photos/3762069/pexels-photo-3762069.jpeg",
    itemCount: 24,
    restaurant: "Flame House",
    isPlatform: true,
    isTrending: true,
    tags: ["Hot", "Popular"]
  },
  {
    id: 2,
    name: "Vegan Delights",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    itemCount: 18,
    restaurant: "Green Leaf",
    isHealthy: true,
    isNew: true,
    tags: ["Plant-based", "Fresh"]
  },
  {
    id: 3,
    name: "Chef's Picks",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947",
    itemCount: 12,
    restaurant: "Gourmet Spot",
    isSponsored: true,
    tags: ["Premium", "Curated"]
  },
  {
    id: 4,
    name: "Quick Bites",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    itemCount: 32,
    restaurant: "Fast Eats",
    tags: ["Fast", "Casual"]
  },
  {
    id: 5,
    name: "Dessert Heaven",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
    itemCount: 15,
    restaurant: "Sweet Tooth",
    isTrending: true,
    tags: ["Sweet", "Indulgent"]
  },
  {
    id: 6,
    name: "Breakfast Favorites",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929",
    itemCount: 22,
    restaurant: "Morning Brew",
    isNew: true,
    tags: ["Morning", "Energy"]
  }
]


export const category = {
  id: 1,
  name: "Plant-Based Delights",
  description: "Discover the vibrant world of plant-based cuisine with our carefully curated selection of meals and meal plans. From hearty vegan burgers to refreshing Buddha bowls, these dishes prove that plant-based eating is anything but boring. All recipes are crafted to deliver maximum flavor and nutrition while being kind to the planet.",
  image: "https://images.pexels.com/photos/9213913/pexels-photo-9213913.jpeg",
  isPlatform: true,
  isTrending: true,
  isPopular: true,
  tags: ["vegan", "vegetarian", "healthy", "sustainable"],
  itemCount: 128,
  restaurant: "Dinner Plate",
  createdBy: "Dinner Plate",
  createdAt: "2023-10-15"
}

export const similarCategories = [
  {
    id: 2,
    name: "Mediterranean Flavors",
    image: "https://images.pexels.com/photos/9840186/pexels-photo-9840186.jpeg",
    isPlatform: true,
    isTrending: true,
    itemCount: 92,
    restaurant: "Dinner Plate",
    tags: ["healthy", "olive oil", "fresh"]
  },
  {
    id: 3,
    name: "Gluten-Free Goodness",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    isPlatform: false,
    isTrending: false,
    itemCount: 76,
    restaurant: "Pure Eats",
    tags: ["celiac-safe", "baked goods"]
  },
  {
    id: 4,
    name: "Farm-to-Table",
    image: "https://images.pexels.com/photos/24205804/pexels-photo-24205804.jpeg",
    isPlatform: true,
    isTrending: true,
    itemCount: 58,
    restaurant: "Dinner Plate",
    tags: ["local", "seasonal", "organic"]
  },
  {
    id: 5,
    name: "Protein Power",
    image: "https://images.pexels.com/photos/5717983/pexels-photo-5717983.jpeg",
    isPlatform: false,
    isTrending: true,
    itemCount: 112,
    restaurant: "Muscle Meals",
    tags: ["fitness", "gains", "high-protein"]
  }
]