"use client"

import { useState } from "react"
import { Input } from "@user-webapp/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@user-webapp/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@user-webapp/components/ui/select"
import { Search } from "lucide-react";
import { meals } from "@user-webapp/app/data/meals"
import { MealGrid } from "@user-webapp/components/Meals/MealGrid"



export default function Meals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meal.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || meal.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedMeals = [...filteredMeals].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price":
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case "prepTime":
        return parseInt(a.prepTime) - parseInt(b.prepTime);
      default:
        return 0;
    }
  });

  const popularMeals = sortedMeals.filter(m => m.isPopular);
  const newMeals = sortedMeals.filter(m => m.isNew);
  const allMeals = sortedMeals;

  return (
    <div className="container mx-auto px-6 py-8 lg:px-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Meals</h1>
        <p className="text-muted-foreground text-lg">Discover delicious meals from top restaurants</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search meals or restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Pasta">Pasta</SelectItem>
                <SelectItem value="Bowls">Bowls</SelectItem>
                <SelectItem value="Burgers">Burgers</SelectItem>
                <SelectItem value="Salads">Salads</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="prepTime">Prep Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Meal Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Meals</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <MealGrid meals={allMeals} wishlist={wishlist} onWishlistToggle={toggleWishlist} />
        </TabsContent>
        
        <TabsContent value="popular" className="mt-6">
          <MealGrid meals={popularMeals} wishlist={wishlist} onWishlistToggle={toggleWishlist} />
        </TabsContent>
        
        <TabsContent value="new" className="mt-6">
          <MealGrid meals={newMeals} wishlist={wishlist} onWishlistToggle={toggleWishlist} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

