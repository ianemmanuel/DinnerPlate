"use client";

import { useState } from "react"
import { Input } from "@user-webapp/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@user-webapp/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@user-webapp/components/ui/select"
import { Search } from "lucide-react"
import { mealPlans } from "@user-webapp/app/data/meal-plans"
import { MealPlanGrid } from "@user-webapp/components/Meal-plans/MealPlanGrid"



export default function MealPlans() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredPlans = mealPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || 
                       (selectedType === "popular" && plan.isPopular) ||
                       (selectedType === "featured" && plan.isFeatured) ||
                       (selectedType === "starting" && plan.isStartingSoon);
    
    return matchesSearch && matchesType;
  });

  const sortedPlans = [...filteredPlans].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.subscribers - a.subscribers;
      case "price":
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case "new":
        return (b.isStartingSoon ? 1 : 0) - (a.isStartingSoon ? 1 : 0);
      default:
        return 0;
    }
  });

  const popularPlans = sortedPlans.filter(p => p.isPopular);
  const featuredPlans = sortedPlans.filter(p => p.isFeatured);
  const startingSoonPlans = sortedPlans.filter(p => p.isStartingSoon);
  const allPlans = sortedPlans;

  return (
    <div className="container mx-auto px-6 py-8 lg:px-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Meal Plans</h1>
        <p className="text-muted-foreground text-lg">Subscribe to curated meal plans from top restaurants</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search meal plans or restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="starting">Starting Soon</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="new">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Meal Plan Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Plans</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="starting">Starting Soon</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <MealPlanGrid plans={allPlans} wishlist={wishlist} onWishlistToggle={toggleWishlist} />
        </TabsContent>
        
        <TabsContent value="popular" className="mt-6">
          <MealPlanGrid plans={popularPlans} wishlist={wishlist} onWishlistToggle={toggleWishlist} />
        </TabsContent>
        
        <TabsContent value="featured" className="mt-6">
          <MealPlanGrid plans={featuredPlans} wishlist={wishlist} onWishlistToggle={toggleWishlist} />
        </TabsContent>
        
        <TabsContent value="starting" className="mt-6">
          <MealPlanGrid plans={startingSoonPlans} wishlist={wishlist} onWishlistToggle={toggleWishlist} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
