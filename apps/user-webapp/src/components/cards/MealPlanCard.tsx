"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@user-webapp/components/ui/card"
import { Button } from "@user-webapp/components/ui/button"
import { Heart, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface MealPlanCardProps {
  plan: {
    name: string
    image: string
    price: string
    subscribers: number
    restaurant: string
    restaurantSlug: string // Add this to avoid calculating in component
  }
}

export default function MealPlanCard({ plan }: MealPlanCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation() // Prevent triggering the parent Link
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
    e.stopPropagation() // Prevent triggering the parent Link
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
    <Link href={`/meal-plans/${plan.name.toLowerCase().replace(/\s+/g, '-')}`} className="block group">
      <Card className="overflow-hidden h-full transition-shadow hover:shadow-md">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={plan.image}
            alt={plan.name}
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
        <div className="p-4 space-y-3">
          <h3 className="font-medium line-clamp-2">{plan.name}</h3>
          
          {/* Replaced Link with button for restaurant */}
          <div className="flex justify-between items-center">
            <button 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.location.href = `/restaurants/${plan.restaurantSlug}`
              }}
              className="text-sm text-muted-foreground hover:underline line-clamp-1 text-left"
            >
              {plan.restaurant}
            </button>
            {plan.subscribers >= 10 && (
              <span className="text-xs text-muted-foreground">
                {plan.subscribers} subscribers
              </span>
            )}
          </div>
          
          <div className="flex justify-between items-center pt-1">
            <span className="font-medium text-sm">{plan.price}</span>
            <button 
              onClick={handleAddToCart}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-5 w-5 text-black dark:text-white" />
            </button>
          </div>
          
          <Button className="w-full mt-3" size="sm" onClick={(e) => e.preventDefault()}>
            Subscribe Now
          </Button>
        </div>
      </Card>
    </Link>
  )
}