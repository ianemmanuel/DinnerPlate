import { Festival } from "@user-webapp/types/festival"

export const festivals: Festival[] = [
  {
    id: 1,
    name: "Truffle & Wine Festival",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187",
    date: "Oct 15, 2023",
    time: "6:00 PM - 10:00 PM",
    location: "Downtown Culinary Center",
    organizer: "Gourmet Collective",
    organizerSlug: "gourmet-collective",
    price: "$95",
    ticketsLeft: 12,
    isFeatured: true,
    isAlmostSoldOut: true,
    tags: ["Wine Pairing", "Fine Dining"]
  },
  {
    id: 2,
    name: "Dinner Plate Street Food Fiesta",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    date: "Oct 22, 2023",
    time: "12:00 PM - 8:00 PM",
    location: "Central Park",
    organizer: "Dinner Plate",
    organizerSlug: "dinner-plate",
    price: "Free",
    isPlatformEvent: true,
    isHappeningSoon: true,
    tags: ["Street Food", "Live Music"]
  },
  {
    id: 3,
    name: "Spice Festival",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    date: "Nov 5, 2023",
    time: "5:00 PM - 11:00 PM",
    location: "Spice Market Square",
    organizer: "Flame House",
    organizerSlug: "flame-house",
    price: "$65",
    isSponsored: true,
    tags: ["Hot", "Exotic"]
  },
  {
    id: 4,
    name: "Cheese & Charcuterie Weekend",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
    date: "Nov 12-13, 2023",
    time: "1:00 PM - 7:00 PM",
    location: "The Cheese Cellar",
    organizer: "Fromagerie",
    organizerSlug: "fromagerie",
    price: "$75",
    ticketsLeft: 42,
    isFeatured: true,
    tags: ["Artisan", "Pairings"]
  },
  {
    id: 5,
    name: "Vegan Night Market",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    date: "Nov 18, 2023",
    time: "4:00 PM - 10:00 PM",
    location: "Green District",
    organizer: "Plant Based Co.",
    organizerSlug: "plant-based-co",
    price: "$25",
    isHappeningSoon: true,
    tags: ["Plant-Based", "Eco-Friendly"]
  },
  {
    id: 6,
    name: "Chocolate & Dessert Expo",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
    date: "Dec 3, 2023",
    time: "11:00 AM - 6:00 PM",
    location: "Convention Center",
    organizer: "Sweet Tooth Events",
    organizerSlug: "sweet-tooth-events",
    price: "$45",
    ticketsLeft: 8,
    isAlmostSoldOut: true,
    isSponsored: true,
    tags: ["Desserts", "Workshops"]
  }
]