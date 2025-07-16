"use client"

import { useState } from "react"
import { Input } from "@user-webapp/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@user-webapp/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@user-webapp/components/ui/select"
import { Search } from "lucide-react"
import { FestivalGrid } from "@user-webapp/components/Festivals/FestivalGrid"
import { festivals } from "@user-webapp/app/data/festivals"
import { Festival } from "@user-webapp/types/festival"

export default function FestivalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const filteredFestivals = festivals.filter((festival: Festival) => {
    const matchesSearch = festival.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         festival.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || 
                       (selectedType === "featured" && festival.isFeatured) ||
                       (selectedType === "platform" && festival.isPlatformEvent) ||
                       (selectedType === "soon" && festival.isHappeningSoon);
    
    return matchesSearch && matchesType
  })

  const sortedFestivals = [...filteredFestivals].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "price":
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case "popular":
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      default:
        return 0;
    }
  })

  const featuredFestivals = sortedFestivals.filter(f => f.isFeatured)
  const platformFestivals = sortedFestivals.filter(f => f.isPlatformEvent)
  const happeningSoonFestivals = sortedFestivals.filter(f => f.isHappeningSoon)
  const allFestivals = sortedFestivals

  return (
    <div className="container mx-auto px-6 py-8 lg:px-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Food Festivals</h1>
        <p className="text-muted-foreground text-lg">Discover upcoming culinary events and experiences</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search festivals or organizers..."
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
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="platform">Dinner Plate Events</SelectItem>
                <SelectItem value="soon">Happening Soon</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Festival Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Festivals</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="platform">Dinner Plate</TabsTrigger>
          <TabsTrigger value="soon">Happening Soon</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <FestivalGrid festivals={allFestivals} />
        </TabsContent>
        
        <TabsContent value="featured" className="mt-6">
          <FestivalGrid festivals={featuredFestivals} />
        </TabsContent>
        
        <TabsContent value="platform" className="mt-6">
          <FestivalGrid festivals={platformFestivals} />
        </TabsContent>
        
        <TabsContent value="soon" className="mt-6">
          <FestivalGrid festivals={happeningSoonFestivals} />
        </TabsContent>
      </Tabs>
    </div>
  );
}