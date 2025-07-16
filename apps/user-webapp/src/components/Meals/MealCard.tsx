"use client"

import Link from "next/link";
import Image from "next/image";
import { Card } from "@user-webapp/components/ui/card";
import { Badge } from "@user-webapp/components/ui/badge";
import { Heart, ShoppingBag, Flame, Star, Zap, Leaf, Clock } from "lucide-react";
import { toast } from "sonner";
import { Meal } from "@user-webapp/types/meal";
import { useState, useEffect } from "react";

interface MealCardProps {
  meal: Meal;
  isWishlisted: boolean;
  onWishlistToggle: (id: number) => void;
}

export function MealCard({ meal, isWishlisted, onWishlistToggle }: MealCardProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${meal.name} added to cart!`, {
      position: "top-center",
      duration: 2000,
      style: {
        background: '#3b82f6',
        color: '#fff',
        border: 'none',
      }
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlistToggle(meal.id);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist!", {
      position: "top-center",
      duration: 2000,
      style: {
        background: isWishlisted ? '#ef4444' : '#4ade80',
        color: '#fff',
        border: 'none',
      }
    });
  };

  const mealSlug = meal.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="group relative">
      <Link
        href={`/meals/${mealSlug}`}
        className="block"
        passHref
      >
        <Card className="overflow-hidden h-full transition-shadow hover:shadow-md cursor-pointer">
          <div className="aspect-square relative">
            <Image
              src={meal.image}
              alt={meal.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ transformOrigin: 'center' }}
              priority={false}
            />
            
            <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
              {meal.isSponsored && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900">
                  <Star className="w-3 h-3 mr-1" />
                  Sponsored
                </Badge>
              )}
              {meal.isPopular && (
                <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
                  <Flame className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
              {meal.isNew && (
                <Badge className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
                  <Zap className="w-3 h-3 mr-1" />
                  New
                </Badge>
              )}
              {meal.isHealthy && (
                <Badge className="bg-gradient-to-r from-green-400 to-teal-500 text-white">
                  <Leaf className="w-3 h-3 mr-1" />
                  Healthy
                </Badge>
              )}
            </div>
            
            <Badge 
              variant="secondary" 
              className="absolute bottom-3 left-3 bg-white/90 text-gray-800 backdrop-blur-sm z-10"
            >
              {meal.category}
            </Badge>
            
            {isClient && (
              <button 
                onClick={handleWishlistToggle}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors z-10"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart 
                  className="h-4 w-4" 
                  fill={isWishlisted ? "#ef4444" : "none"}
                  stroke={isWishlisted ? "#ef4444" : "currentColor"}
                />
              </button>
            )}
          </div>
          
          <div className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-medium line-clamp-2">{meal.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{meal.rating}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground line-clamp-1">
                {meal.restaurant}
              </span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{meal.prepTime}</span>
              </div>
            </div>
            
            {meal.tags && (
              <div className="flex flex-wrap gap-1 mt-1">
                {meal.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-xs bg-gray-100/80 backdrop-blur-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex justify-between items-center pt-2">
              <span className="font-medium">{meal.price}</span>
              {isClient && (
                <button 
                  onClick={handleAddToCart}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10"
                  aria-label="Add to cart"
                >
                  <ShoppingBag className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}