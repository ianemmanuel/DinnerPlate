"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Card } from "@user-webapp/components/ui/card";
import { Button } from "@user-webapp/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@user-webapp/components/ui/avatar";
import { Badge } from "@user-webapp/components/ui/badge";
import { Heart, Tag, Star, Settings, History, MapPin, ScrollText, Utensils, Calendar } from "lucide-react";
import { Skeleton } from "@user-webapp/components/ui/skeleton";
import { Separator } from "@user-webapp/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@user-webapp/components/ui/tabs";
import { MealGrid } from "@user-webapp/components/Grids/MealGrid"
import { MealPlanGrid } from "@user-webapp/components/Grids/MealPlanGrid" 
import { CategoryGrid } from "@user-webapp/components/Grids/CategoryGrid" 
import { RestaurantGrid } from "@user-webapp/components/Grids/RestaurantGrid"  
import { DealGrid } from "@user-webapp/components/Grids/DealGrid"
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, isLoading } = useKindeBrowserClient();

  // Mock data - replace with your actual data fetching
  const stats = {
    wishlist: 12,
    savedDeals: 5,
    orders: 8,
    following: 7,
    preferredCategories: 4
  };

// Mock data arrays with beautiful food images
const favoriteMeals = [
  {
    id: 1,
    name: "Truffle Mushroom Pasta",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    price: "$18.50",
    rating: 4.8,
    prepTime: "20-25 min",
    restaurant: "Bella Vista",
    restaurantSlug: "bella-vista",
    category: "Pasta",
    isPopular: true,
    tags: ["Vegetarian", "Creamy"]
  },
  {
    id: 2,
    name: "Avocado Salmon Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    price: "$16.00",
    rating: 4.9,
    prepTime: "15-20 min",
    restaurant: "Green Bowl",
    restaurantSlug: "green-bowl",
    category: "Bowls",
    isHealthy: true,
    tags: ["High Protein", "Gluten Free"]
  },
  {
    id: 3,
    name: "Wagyu Beef Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    price: "$22.00",
    rating: 4.7,
    prepTime: "10-15 min",
    restaurant: "Burger Junction",
    restaurantSlug: "burger-junction",
    category: "Burgers",
    isFeatured: true,
    tags: ["Gourmet", "Juicy"]
  }
];

const savedMealPlans = [
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
    cycles: 4
  },
  {
    id: 2,
    name: "Mediterranean Lifestyle",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
    price: "$75",
    pricePer: "per week",
    subscribers: 210,
    restaurant: "Olive Tree",
    restaurantSlug: "olive-tree",
    cycles: 12
  }
];

const followedRestaurants = [
  {
    id: 1,
    name: "Bella Vista",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    cuisine: "Italian",
    rating: 4.8,
    location: "Downtown",
    isFeatured: true
  },
  {
    id: 2,
    name: "Green Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    cuisine: "Healthy",
    rating: 4.9,
    location: "Midtown",
    isHealthy: true
  },
  {
    id: 3,
    name: "Mediterranean Breeze",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
    cuisine: "Mediterranean",
    rating: 4.7,
    location: "Beachside",
    isTrending: true
  }
];

const preferredCategories = [
  {
    id: 1,
    name: "Pasta",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    itemCount: 24,
    restaurant: "Multiple",
    isPlatform: true,
    tags: ["Comfort Food"]
  },
  {
    id: 2,
    name: "Healthy Bowls",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    itemCount: 18,
    restaurant: "Green Bowl",
    isHealthy: true,
    tags: ["Nutritious"]
  },
  {
    id: 3,
    name: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    itemCount: 15,
    restaurant: "Burger Junction",
    isPopular: true,
    tags: ["Juicy"]
  }
];

const savedDeals = [
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
    name: "Weekend Feast Deal",
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
    name: "Bella Vista Special",
    description: "10% off your entire order",
    discount: "10% OFF",
    type: 'restaurant',
    applicableTo: "Bella Vista",
    applicableToSlug: "bella-vista",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    expires: "2023-12-15"
  }
];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        ) : (
          <>
            <Avatar className="h-24 w-24 border-4 border-primary/10">
              <AvatarImage src={user?.picture || undefined} />
              <AvatarFallback className="bg-primary/10 text-2xl font-medium">
                {user?.given_name?.[0]}{user?.family_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">
                {user?.given_name} {user?.family_name}
              </h1>
              <p className="text-muted-foreground mb-4">{user?.email}</p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  Premium Member
                </Badge>
                <Badge variant="outline">
                  Joined {new Date(Date.now()).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard 
          icon={<Heart className="h-6 w-6 text-rose-500" />}
          value={stats.wishlist}
          label="Wishlist"
        />
        <StatCard 
          icon={<Tag className="h-6 w-6 text-emerald-500" />}
          value={stats.savedDeals}
          label="Saved Deals"
        />
        <StatCard 
          icon={<ScrollText className="h-6 w-6 text-amber-500" />}
          value={stats.orders}
          label="Orders"
        />
        <StatCard 
          icon={<Utensils className="h-6 w-6 text-indigo-500" />}
          value={stats.following}
          label="Following"
        />
        <StatCard 
          icon={<MapPin className="h-6 w-6 text-blue-500" />}
          value={stats.preferredCategories}
          label="Categories"
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="w-full overflow-x-auto">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="activity">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Activity
              </h2>
              <div className="space-y-6">
                <ActivityItem 
                  icon={<Heart className="h-5 w-5 text-rose-500" />}
                  title="Added to wishlist"
                  description="Truffle Mushroom Pasta from Bella Vista"
                  time="2 hours ago"
                />
                <Separator />
                <ActivityItem 
                  icon={<Tag className="h-5 w-5 text-emerald-500" />}
                  title="Saved deal"
                  description="20% off all pasta dishes"
                  time="1 day ago"
                />
                <Separator />
                <ActivityItem 
                  icon={<Star className="h-5 w-5 text-amber-500" />}
                  title="Followed restaurant"
                  description="Mediterranean Breeze"
                  time="3 days ago"
                />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Heart className="h-5 w-5 text-rose-500" />
                  Your Wishlist ({stats.wishlist})
                </h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <MealGrid 
                meals={favoriteMeals.slice(0, 4)} 
                wishlist={favoriteMeals.map(m => m.id)} 
                onWishlistToggle={() => {}} 
              />
            </Card>
          </TabsContent>

          <TabsContent value="meal-plans">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Saved Meal Plans ({savedMealPlans.length})
                </h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <MealPlanGrid 
                plans={savedMealPlans.slice(0, 3)} 
                wishlist={[]} 
                onWishlistToggle={() => {}} 
              />
            </Card>
          </TabsContent>

          <TabsContent value="following">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-indigo-500" />
                  Following ({stats.following})
                </h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {followedRestaurants.slice(0, 5).map(restaurant => (
                  <FollowedRestaurantItem 
                    key={restaurant.id}
                    restaurant={restaurant}
                    onUnfollow={() => toast.success(`Unfollowed ${restaurant.name}`)}
                  />
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-500" />
                  Preferred Categories ({stats.preferredCategories})
                </h2>
                <Button variant="outline" size="sm">
                  Update Preferences
                </Button>
              </div>
              <CategoryGrid categories={preferredCategories} />
            </Card>
          </TabsContent>

          <TabsContent value="deals">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Tag className="h-5 w-5 text-emerald-500" />
                  Saved Deals ({stats.savedDeals})
                </h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <DealGrid deals={savedDeals} />
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Settings
              </h2>
              <div className="space-y-6">
                <SettingItem 
                  title="Personal Information"
                  description="Update your name, email, and profile picture"
                  action={<Button variant="outline" size="sm">Edit</Button>}
                />
                <Separator />
                <SettingItem 
                  title="Notification Preferences"
                  description="Manage how we contact you"
                  action={<Button variant="outline" size="sm">Configure</Button>}
                />
                <Separator />
                <SettingItem 
                  title="Security"
                  description="Change password and security settings"
                  action={<Button variant="outline" size="sm">Update</Button>}
                />
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

// Component for stats cards
function StatCard({ icon, value, label }: { icon: React.ReactNode, value: number, label: string }) {
  return (
    <Card className="p-4 text-center hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </Card>
  );
}

// Component for activity items
function ActivityItem({ icon, title, description, time }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  time: string 
}) {
  return (
    <div className="flex gap-4">
      <div className="flex items-start pt-0.5">
        <div className="p-2 rounded-full bg-primary/10">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  );
}

// Component for followed restaurants list
function FollowedRestaurantItem({ restaurant, onUnfollow }: { 
  restaurant: { id: number, name: string, image: string, cuisine: string }, 
  onUnfollow: () => void 
}) {
  return (
    <div className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
      <div className="relative h-12 w-12 flex-shrink-0">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="rounded-full h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{restaurant.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{restaurant.cuisine}</p>
      </div>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onUnfollow}
      >
        Following
      </Button>
    </div>
  );
}

// Component for setting items
function SettingItem({ title, description, action }: { 
  title: string, 
  description: string,
  action: React.ReactNode
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}