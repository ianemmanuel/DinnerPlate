"use client"

import { useState } from "react"
import { Input } from "@user-webapp/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@user-webapp/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@user-webapp/components/ui/select";
import { Search } from "lucide-react"
import { RestaurantGrid } from "@user-webapp/components/Restaurants/RestaurantGrid"
import { restaurants } from "@user-webapp/app/data/restaurants" 

export default function Restaurants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCuisine = selectedCuisine === "all" || restaurant.cuisine === selectedCuisine
    const matchesLocation = selectedLocation === "all" || restaurant.location === selectedLocation
    
    return matchesSearch && matchesCuisine && matchesLocation
  })

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      case "deliveryTime":
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      default:
        return 0
    }
  })

  const featuredRestaurants = sortedRestaurants.filter(r => r.featured)
  const sponsoredRestaurants = sortedRestaurants.filter(r => r.sponsored)
  const trendingRestaurants = sortedRestaurants.filter(r => r.trending)
  const allRestaurants = sortedRestaurants;

  return (
    <div className="container mx-auto px-6 py-8 lg:px-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Restaurants</h1>
        <p className="text-muted-foreground text-lg">Discover amazing restaurants and cuisines</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search restaurants or cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="Cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuisines</SelectItem>
                <SelectItem value="Italian">Italian</SelectItem>
                <SelectItem value="Japanese">Japanese</SelectItem>
                <SelectItem value="Indian">Indian</SelectItem>
                <SelectItem value="American">American</SelectItem>
                <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                <SelectItem value="Mexican">Mexican</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Downtown">Downtown</SelectItem>
                <SelectItem value="Midtown">Midtown</SelectItem>
                <SelectItem value="Uptown">Uptown</SelectItem>
                <SelectItem value="Beachside">Beachside</SelectItem>
                <SelectItem value="Southside">Southside</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="reviews">Reviews</SelectItem>
                <SelectItem value="deliveryTime">Delivery Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Restaurant Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="sponsored">Sponsored</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <RestaurantGrid 
            restaurants={allRestaurants} 
            favorites={favorites} 
            onToggleFavorite={toggleFavorite} 
          />
        </TabsContent>
        
        <TabsContent value="featured" className="mt-6">
          <RestaurantGrid 
            restaurants={featuredRestaurants} 
            favorites={favorites} 
            onToggleFavorite={toggleFavorite} 
          />
        </TabsContent>
        
        <TabsContent value="trending" className="mt-6">
          <RestaurantGrid 
            restaurants={trendingRestaurants} 
            favorites={favorites} 
            onToggleFavorite={toggleFavorite} 
          />
        </TabsContent>
        
        <TabsContent value="sponsored" className="mt-6">
          <RestaurantGrid 
            restaurants={sponsoredRestaurants} 
            favorites={favorites} 
            onToggleFavorite={toggleFavorite} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}