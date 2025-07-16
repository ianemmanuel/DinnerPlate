import { Deal } from "@user-webapp/types/deal";

export const deals: Deal[] = [
  {
    id: 1,
    title: "Pasta Lovers Special",
    description: "20% off all pasta dishes",
    discount: "20% OFF",
    type: 'category',
    applicableTo: "Pasta",
    applicableToSlug: "pasta",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    expires: "2023-11-30",
    isFeatured: true
  },
  {
    id: 2,
    title: "Weekend Feast Deal",
    description: "15% off meal plans this weekend",
    discount: "15% OFF",
    code: "WEEKEND15",
    type: 'meal-plan',
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    expires: "2023-11-12",
    isNew: true
  },
  {
    id: 3,
    title: "Bella Vista Special",
    description: "10% off your entire order",
    discount: "10% OFF",
    type: 'restaurant',
    applicableTo: "Bella Vista",
    applicableToSlug: "bella-vista",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    expires: "2023-12-15"
  },
  {
    id: 4,
    title: "Festival Early Bird",
    description: "$10 off festival tickets booked this week",
    discount: "$10 OFF",
    code: "FEST10",
    type: 'festival',
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    expires: "2023-11-10",
    isAlmostExpired: true
  },
  {
    id: 5,
    title: "Burger Bonanza",
    description: "Buy one burger, get one half price",
    discount: "BOGO 50%",
    type: 'meal',
    applicableTo: "All Burgers",
    applicableToSlug: "burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    expires: "2023-11-20",
    isFeatured: true
  },
  {
    id: 6,
    title: "Healthy Start",
    description: "15% off all salad and bowl items",
    discount: "15% OFF",
    type: 'category',
    applicableTo: "Healthy",
    applicableToSlug: "healthy",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    expires: "2023-11-30"
  }
]