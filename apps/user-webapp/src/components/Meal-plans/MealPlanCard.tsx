"use client"

import Link from "next/link";
import Image from "next/image";
import { Card } from "@user-webapp/components/ui/card";
import { Badge } from "@user-webapp/components/ui/badge";
import { Heart, ShoppingBag, Flame, Zap, Star } from "lucide-react";
import { toast } from "sonner";
import { MealPlan } from "@user-webapp/types/meal-plan";
import { useState, useEffect } from "react";

interface MealPlanCardProps {
  plan: MealPlan;
  isWishlisted: boolean;
  onWishlistToggle: (id: number) => void;
}

export function MealPlanCard({ plan, isWishlisted, onWishlistToggle }: MealPlanCardProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${plan.name} added to cart!`, {
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
    onWishlistToggle(plan.id);
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

  const planSlug = plan.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="group relative">
      <Link href={`/meal-plans/${planSlug}`} passHref>
        <Card className="overflow-hidden h-full transition-shadow hover:shadow-md cursor-pointer">
          <div className="aspect-[3/2] relative">
            <Image
              src={plan.image}
              alt={plan.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ transformOrigin: 'center' }}
            />
            
            <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
              {plan.isPopular && (
                <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
                  <Flame className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
              {plan.isFeatured && (
                <Badge className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
              {plan.isStartingSoon && (
                <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                  <Zap className="w-3 h-3 mr-1" />
                  Starts Soon
                </Badge>
              )}
            </div>
            
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
            <h3 className="font-medium line-clamp-2">{plan.name}</h3>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground line-clamp-1">
                {plan.restaurant}
              </span>
              {plan.subscribers >= 10 && (
                <span className="text-xs text-muted-foreground">
                  {plan.subscribers} subscribers
                </span>
              )}
            </div>
            
            <div className="flex justify-between items-center pt-1">
              <div>
                <span className="font-medium">{plan.price}</span>
                {plan.pricePer && (
                  <span className="text-xs text-muted-foreground ml-1">{plan.pricePer}</span>
                )}
                <span className="text-xs text-muted-foreground block">
                  {plan.cycles ? `${plan.cycles} cycle${plan.cycles > 1 ? 's' : ''}` : 'Single cycle'}
                </span>
              </div>
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