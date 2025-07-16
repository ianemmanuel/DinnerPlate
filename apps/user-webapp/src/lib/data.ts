// This file contains all the data used in the application
// Separating data from components makes it easier to manage and update

export const categories = [
    {
      name: "Italian Cuisine",
      image: "https://images.pexels.com/photos/3762069/pexels-photo-3762069.jpeg",
      count: "120+ Restaurants"
    },
    {
      name: "Japanese Cuisine",
      image: "https://images.pexels.com/photos/3147493/pexels-photo-3147493.jpeg",
      count: "85+ Restaurants"
    },
    {
      name: "Indian Cuisine",
      image: "https://images.pexels.com/photos/2124699/pexels-photo-2124699.jpeg",
      count: "95+ Restaurants"
    },
    {
      name: "Mediterranean",
      image: "https://images.pexels.com/photos/14375617/pexels-photo-14375617.jpeg",
      count: "75+ Restaurants"
    },
    {
      name: "Chinese Cuisine",
      image: "https://images.pexels.com/photos/19252760/pexels-photo-19252760/free-photo-of-eating-noodles-with-shrimps-and-bamboo-shoots-using-chopsticks.jpeg",
      count: "110+ Restaurants"
    }
  ];
  
  export const popularMeals = [
    {
      name: "Truffle Pasta",
      image: "/images/meals/truffle-pasta.jpg",
      restaurant: "La Piazza",
      price: "$24.99",
      rating: 4.8
    },
    {
      name: "Sushi Platter",
      image: "/images/meals/sushi-platter.jpg",
      restaurant: "Sushi Master",
      price: "$45.99",
      rating: 4.9
    },
    {
      name: "Butter Chicken",
      image: "/images/meals/butter-chicken.jpg",
      restaurant: "Spice Route",
      price: "$19.99",
      rating: 4.7
    },
    {
      name: "Beef Wellington",
      image: "/images/meals/beef-wellington.jpg",
      restaurant: "Le Bistro",
      price: "$39.99",
      rating: 4.9
    }
  ];
  
  export const restaurants = [
    {
      name: "La Piazza",
      image: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg",
      cuisine: "Italian",
      price: "$$",
      rating: 4.5,
      reviews: 200,
      isOpen: true,
      closeTime: "10:00 PM"
    },
    {
      name: "Sushi Master",
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      cuisine: "Japanese",
      price: "$$$",
      rating: 4.8,
      reviews: 150,
      isOpen: true,
      closeTime: "11:00 PM"
    },
    {
      name: "Spice Route",
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      cuisine: "Indian",
      price: "$$",
      rating: 4.6,
      reviews: 180,
      isOpen: false,
      openTime: "5:00 PM"
    },
    {
      name: "Le Bistro",
      image: "https://images.pexels.com/photos/15198279/pexels-photo-15198279/free-photo-of-hands-holding-bottle-of-wine-next-to-gourmet-dishes.jpeg",
      cuisine: "French",
      price: "$$$",
      rating: 4.7,
      reviews: 220,
      isOpen: true,
      closeTime: "9:30 PM"
    }
  ];
  
  export const mealPlans = [
    {
      name: "Gourmet Weekly",
      image: "https://images.pexels.com/photos/2144200/pexels-photo-2144200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "7-day cycle • Premium ingredients",
      price: "$199/week",
      subscribers: 150,
      restaurant: "Le Bistro"
    },
    {
      name: "Healthy Balance",
      image: "https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "5-day cycle • Nutritionist approved",
      price: "$149/week",
      subscribers: 280,
      restaurant: "Green Kitchen"
    },
    {
      name: "Chef's Special",
      image: "https://images.pexels.com/photos/32292049/pexels-photo-32292049/free-photo-of-delicious-dumplings-with-sauce-and-chopsticks.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "3-day cycle • Exclusive recipes",
      price: "$99/week",
      subscribers: 95,
      restaurant: "La Piazza"
    },
        {
      name: "Chef's Special",
      image: "https://images.pexels.com/photos/26845475/pexels-photo-26845475/free-photo-of-meat-with-chili-and-fries.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "3-day cycle • Exclusive recipes",
      price: "$99/week",
      subscribers: 95,
      restaurant: "La Piazza"
    }
  ];
  
  export const howItWorksSteps = [
    {
      title: "Choose Your Location",
      description: "Enter your address to find restaurants near you",
    },
    {
      title: "Browse Restaurants",
      description: "Explore menus and meal plans from local restaurants",
    },
    {
      title: "Select Your Meals",
      description: "Order individual meals or subscribe to meal plans",
    },
    {
      title: "Enjoy Your Food",
      description: "Get your food delivered right to your doorstep",
    }
  ];