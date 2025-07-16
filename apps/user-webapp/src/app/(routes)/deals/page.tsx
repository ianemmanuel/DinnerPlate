"use client"

import { useState } from "react"
import { Input } from "@user-webapp/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@user-webapp/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@user-webapp/components/ui/select"
import { Search } from "lucide-react"
import { DealGrid } from "@user-webapp/components/Deals/DealGrid"
import { deals } from "@user-webapp/app/data/deals"
import { Deal } from "@user-webapp/types/deal"

export default function DealsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredDeals = deals.filter((deal: Deal) => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || deal.type === selectedType
    
    return matchesSearch && matchesType
  })

  const featuredDeals = filteredDeals.filter(d => d.isFeatured)
  const newDeals = filteredDeals.filter(d => d.isNew)
  const expiringDeals = filteredDeals.filter(d => d.isAlmostExpired)
  const allDeals = filteredDeals

  return (
    <div className="container mx-auto px-6 py-8 lg:px-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Exclusive Deals</h1>
        <p className="text-muted-foreground text-lg">Limited-time offers across restaurants, meals, and more</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Deals</SelectItem>
                <SelectItem value="meal">Meal Deals</SelectItem>
                <SelectItem value="meal-plan">Meal Plan Deals</SelectItem>
                <SelectItem value="restaurant">Restaurant Deals</SelectItem>
                <SelectItem value="category">Category Deals</SelectItem>
                <SelectItem value="festival">Festival Deals</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Deal Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Deals</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <DealGrid deals={allDeals} />
        </TabsContent>
        
        <TabsContent value="featured" className="mt-6">
          <DealGrid deals={featuredDeals} />
        </TabsContent>
        
        <TabsContent value="new" className="mt-6">
          <DealGrid deals={newDeals} />
        </TabsContent>
        
        <TabsContent value="expiring" className="mt-6">
          <DealGrid deals={expiringDeals} />
        </TabsContent>
      </Tabs>
    </div>
  );
}