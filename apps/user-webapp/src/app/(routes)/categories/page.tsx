"use client"

import { useState } from "react"
import { Input } from "@user-webapp/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@user-webapp/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@user-webapp/components/ui/select"
import { Search } from "lucide-react"
import { CategoryGrid } from "@user-webapp/components/Categories/CategoryGrid"
import { categories } from "@user-webapp/app/data/categories"
import { Category } from "@user-webapp/types/category"

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const filteredCategories = categories.filter((category: Category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || 
                       (selectedType === "spicy" && category.isSpicy) ||
                       (selectedType === "healthy" && category.isHealthy) ||
                       (selectedType === "new" && category.isNew)
    
    return matchesSearch && matchesType
  })

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.itemCount - a.itemCount;
      case "new":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  })

  const trendingCategories = sortedCategories.filter(c => c.isTrending)
  const newCategories = sortedCategories.filter(c => c.isNew)
  const allCategories = sortedCategories

  return (
    <div className="container mx-auto px-6 py-8 lg:px-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Food Categories</h1>
        <p className="text-muted-foreground text-lg">Explore delicious food categories</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories or restaurants..."
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
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="spicy">Spicy</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="new">New</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="new">Newest</SelectItem>
                <SelectItem value="name">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Categories</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="new">New Arrivals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <CategoryGrid categories={allCategories} />
        </TabsContent>
        
        <TabsContent value="trending" className="mt-6">
          <CategoryGrid categories={trendingCategories} />
        </TabsContent>
        
        <TabsContent value="new" className="mt-6">
          <CategoryGrid categories={newCategories} />
        </TabsContent>
      </Tabs>
    </div>
  );
}