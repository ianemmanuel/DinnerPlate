"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@user-webapp/components/ui/card"
import { Heart, Star, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface MealCardProps {
  meal: {
    name: string
    image: string
    restaurant: string
    price: string
    rating: number | string
  }
}

export default function MealCard({ meal }: MealCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const slug = meal.name.toLowerCase().replace(/\s+/g, '-')
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
    
    if (!isWishlisted) {
      toast.success("Added to wishlist!", {
        position: "top-center",
        duration: 2000,
        style: {
          background: '#4ade80',
          color: '#fff',
          border: 'none',
        }
      })
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    toast.success("Added to cart!", {
      position: "top-center",
      duration: 2000,
      style: {
        background: '#3b82f6',
        color: '#fff',
        border: 'none',
      }
    })
  }
  
  return (
    <Link href={`/meals/${slug}`} className="block group">
      <Card className="overflow-hidden h-full transition-shadow hover:shadow-md">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={meal.image}
            alt={meal.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            style={{ transformOrigin: 'center' }}
            priority
          />
          <button 
            onClick={handleWishlist}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart 
              className="h-5 w-5 text-gray-700" 
              fill={isWishlisted ? "#ef4444" : "none"}
              stroke={isWishlisted ? "#ef4444" : "currentColor"}
            />
          </button>
        </div>
        <div className="p-3 space-y-2">
          <h3 className="font-medium line-clamp-2">{meal.name}</h3>
          
          <div className="flex justify-between items-center">
            <Link 
              href={`/restaurants/${meal.restaurant.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm text-muted-foreground hover:underline line-clamp-1"
              onClick={(e) => e.stopPropagation()}
            >
              {meal.restaurant}
            </Link>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{meal.rating}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-1">
            <span className="font-medium text-sm">{meal.price}</span>
            <button 
              onClick={handleAddToCart}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-6 w-6 text-black dark:text-white" />
            </button>
          </div>
        </div>
      </Card>
    </Link>
  )
}