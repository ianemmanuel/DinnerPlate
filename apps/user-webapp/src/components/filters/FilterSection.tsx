"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Search, SlidersHorizontal } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

interface FilterSectionProps {
  type: "meals" | "mealPlans" | "restaurants" | "categories"
  onSearch: (query: string) => void
  onSort: (value: string) => void
  onFilter: (filters: any) => void
}

export default function FilterSection({ type, onSearch, onSort, onFilter }: FilterSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const sortOptions = {
    meals: [
      { value: "popular", label: "Most Popular" },
      { value: "rating", label: "Highest Rated" },
      { value: "price-low", label: "Price: Low to High" },
      { value: "price-high", label: "Price: High to Low" },
    ],
    mealPlans: [
      { value: "popular", label: "Most Popular" },
      { value: "subscribers", label: "Most Subscribers" },
      { value: "price-low", label: "Price: Low to High" },
      { value: "price-high", label: "Price: High to Low" },
    ],
    restaurants: [
      { value: "rating", label: "Highest Rated" },
      { value: "reviews", label: "Most Reviews" },
      { value: "distance", label: "Nearest to Me" },
    ],
    categories: [
      { value: "popular", label: "Most Popular" },
      { value: "items", label: "Most Items" },
      { value: "az", label: "A-Z" },
    ],
  }

  return (
    <div className="sticky top-16 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-md">
      <div className="px-4 md:px-8 py-4 max-w-screen-2xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <form onSubmit={handleSearch} className="w-full flex gap-2">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${type}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button type="submit" className="shrink-0">Search</Button>
        </form>



          <div className="flex gap-2">
            <Select onValueChange={onSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions[type].map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your search with these filters
                  </SheetDescription>
                </SheetHeader>
                {/* Add filter options based on type */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  )
}