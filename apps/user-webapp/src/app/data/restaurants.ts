import { Restaurant } from "@user-webapp/types/restaurant"

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Bella Vista",
    cuisine: "Italian",
    rating: 4.8,
    reviews: 245,
    deliveryTime: "25-35 min",
    openingTime: "08:00 AM",
    closingTime: "10:00 PM",
    isOpen: true,
    image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Downtown",
    price: "$$$",
    featured: true,
    sponsored: false,
    trending: true,
    tags: ["Authentic", "Romantic", "Family-friendly"]
  },
  {
    id: 2,
    name: "Sakura Sushi",
    cuisine: "Japanese",
    rating: 4.9,
    reviews: 189,
    deliveryTime: "30-40 min",
    openingTime: "11:00 AM",
    closingTime: "09:00 PM",
    isOpen: false,
    image: "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg",
    location: "Midtown",
    price: "$$$$",
    featured: true,
    sponsored: true,
    trending: true,
    tags: ["Premium", "Fresh", "Traditional"]
  },
  {
    id: 3,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.6,
    reviews: 312,
    deliveryTime: "20-30 min",
    openingTime: "10:00 AM",
    closingTime: "11:00 PM",
    isOpen: true,
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Uptown",
    price: "$$",
    featured: false,
    sponsored: false,
    trending: false,
    tags: ["Spicy", "Vegetarian", "Halal"]
  },
  {
    id: 4,
    name: "Burger Junction",
    cuisine: "American",
    rating: 4.4,
    reviews: 156,
    deliveryTime: "15-25 min",
    openingTime: "09:00 AM",
    closingTime: "12:00 AM",
    isOpen: true,
    image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Downtown",
    price: "$",
    featured: false,
    sponsored: true,
    trending: true,
    tags: ["Fast", "Casual", "Comfort Food"]
  },
  {
    id: 5,
    name: "Mediterranean Breeze",
    cuisine: "Mediterranean",
    rating: 4.7,
    reviews: 198,
    deliveryTime: "25-35 min",
    openingTime: "07:00 AM",
    closingTime: "10:30 PM",
    isOpen: true,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Beachside",
    price: "$$$",
    featured: true,
    sponsored: false,
    trending: false,
    tags: ["Healthy", "Organic", "Seafood"]
  },
  {
    id: 6,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.5,
    reviews: 267,
    deliveryTime: "20-30 min",
    openingTime: "10:30 AM",
    closingTime: "11:30 PM",
    isOpen: false,
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Southside",
    price: "$$",
    featured: false,
    sponsored: true,
    trending: true,
    tags: ["Authentic", "Vibrant", "Street Food"]
  }
]

export const restaurant = {
  name: "Ocean Fresh",
  description: "Experience the finest seafood dishes crafted with fresh, locally-sourced ingredients. Our expert chefs combine traditional recipes with modern culinary techniques to create unforgettable dining experiences.",
  rating: 4.8,
  reviews: 1250,
  coverImage: "https://images.pexels.com/photos/17023054/pexels-photo-17023054.jpeg",
  profileImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  images: [
    "https://images.pexels.com/photos/29478468/pexels-photo-29478468.jpeg",
    "https://images.pexels.com/photos/4992827/pexels-photo-4992827.jpeg",
    "https://images.pexels.com/photos/7545572/pexels-photo-7545572.jpeg",
    "https://images.pexels.com/photos/14646749/pexels-photo-14646749.jpeg",
  ],
  hours: "8:00 AM - 10:00 PM",
  phone: "+1 234 567 8900",
  email: "contact@oceanfresh.com",
  social: {
    instagram: "oceanfresh",
    facebook: "oceanfreshseafood",
    twitter: "oceanfresh",
  },
  branches: [
    {
      name: "Downtown Branch",
      address: "123 Main St, Downtown",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      name: "Waterfront Branch",
      address: "456 Beach Rd, Waterfront",
      coordinates: { lat: 40.7589, lng: -73.9851 }
    }
  ],
  featuredMeals: [
    {
      id: 1,
      name: "Spicy Noodles with Slices of Citrus ",
      slug: "spicy-noodles-with-slices-of-citrus ",
      description: "Fresh salmon with greens and rice.",
      image: "https://images.pexels.com/photos/5409014/pexels-photo-5409014.jpeg",
      restaurant: "Ocean Fresh",
      restaurantSlug: "ocean-fresh",
      price: "$24.99",
      rating: 4.7,
      reviews: 120,
      prepTime: "15-20 min",
      category: "Seafood",
      tags: ["High-protein", "Low-carb"],
      isPopular: true,
      isHealthy: true,
      isNew: false,
      isSponsored: false,
    },
    {
        id: 2,
        name: "Grilled Salmon Bowl",
        slug: "grilled-salmon-bowl",
        description: "Fresh salmon with greens and rice.",
        image: "https://images.pexels.com/photos/19532105/pexels-photo-19532105.jpeg",
        restaurant: "Ocean Fresh",
        restaurantSlug: "ocean-fresh",
        price: "$24.99",
        rating: 4.7,
        reviews: 120,
        prepTime: "15-20 min",
        category: "Seafood",
        tags: ["High-protein", "Low-carb"],
        isPopular: true,
        isHealthy: true,
        isNew: false,
        isSponsored: false,
    }
  ],
  featuredMealPlans: [
    {
      id: 1,
      name: "Seafood Lover's Plan",
      image: "https://images.pexels.com/photos/15387326/pexels-photo-15387326.jpeg",
      price: "$89.99/week",
      subscribers: 156,
      restaurant: "Ocean Fresh",
      restaurantSlug: 'ocean-fresh',
      isPopular: true,
      isFeatured: true,
      isStartingSoon: false,
      pricePer: "/week",
      cycles: 4
    },
    {
      id: 2,
      name: "Healthy Fish Plan",
      image: "https://images.pexels.com/photos/4899801/pexels-photo-4899801.jpeg",
      price: "$79.99/week",
      subscribers: 98,
      restaurant: "Ocean Fresh",
      restaurantSlug: 'ocean-fresh',
      isPopular: false,
      isFeatured: true,
      isStartingSoon: true,
      pricePer: "/week",
      cycles: 4
    }
  ],
  deals: [
    {
      title: "Early Bird Special",
      description: "20% off all breakfast items",
      validUntil: "2024-04-30",
      code: "EARLY20"
    },
    {
      title: "Family Bundle",
      description: "Save 25% on family-size portions",
      validUntil: "2024-04-15",
      code: "FAMILY25"
    }
  ],
  achievements: [
    {
      title: "100k Happy Customers",
      date: "March 2024",
      description: "Proudly served over 100,000 satisfied customers!"
    },
    {
      title: "Best Seafood Restaurant 2024",
      date: "January 2024",
      description: "Awarded the city's best seafood restaurant"
    }
  ],
  updates: [
    {
      title: "New Summer Menu Launch",
      date: "March 15, 2024",
      content: "Introducing our new summer menu featuring fresh, seasonal ingredients"
    },
    {
      title: "Special Easter Brunch",
      date: "March 10, 2024",
      content: "Join us for a special Easter brunch celebration"
    }
  ]
}

export const openingSchedule = [
  { day: "Monday", hours: "8:00 AM - 10:00 PM" },
  { day: "Tuesday", hours: "8:00 AM - 10:00 PM" },
  { day: "Wednesday", hours: "8:00 AM - 10:00 PM" },
  { day: "Thursday", hours: "8:00 AM - 10:00 PM" },
  { day: "Friday", hours: "8:00 AM - 10:00 PM" },
  { day: "Saturday", hours: "8:00 AM - 10:00 PM" },
  { day: "Sunday", hours: "8:00 AM - 10:00 PM" },
]
