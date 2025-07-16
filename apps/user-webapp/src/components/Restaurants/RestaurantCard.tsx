import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@user-webapp/components/ui/card";
import { Button } from "@user-webapp/components/ui/button";
import { Badge } from "@user-webapp/components/ui/badge";
import { MapPin, Star, Clock, Heart, Award, Flame } from "lucide-react";
import { RestaurantCardProps } from "@user-webapp/types/restaurant";
import { useState, useEffect } from "react";

export function RestaurantCard({ restaurant, isFavorite, onToggleFavorite }: RestaurantCardProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(restaurant.id);
  };

  return (
    <div className="group relative">
      <Link href={`/restaurants/${restaurant.id}`} passHref>
        <Card className="hover:shadow-lg transition-all duration-300 h-full cursor-pointer">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            <div className="absolute top-2 left-2 space-y-1 z-10">
              {restaurant.sponsored && (
                <Badge className="bg-yellow-500/90 text-yellow-900 backdrop-blur-sm">
                  <Award className="w-3 h-3 mr-1" />
                  Sponsored
                </Badge>
              )}
              {restaurant.featured && (
                <Badge className="bg-primary/90 text-white backdrop-blur-sm">
                  Featured
                </Badge>
              )}
              {restaurant.trending && (
                <Badge className="bg-orange-500/90 text-white backdrop-blur-sm">
                  <Flame className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              )}
            </div>
            
            {isClient && (
              <Button
                variant="ghost"
                size="icon"
                className={`absolute bottom-2 right-2 h-8 w-8 rounded-full z-10 ${
                  isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600'
                }`}
                onClick={handleToggleFavorite}
              >
                <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
              </Button>
            )}
          </div>
          
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{restaurant.name}</CardTitle>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{restaurant.rating}</span>
              </div>
            </div>
            <CardDescription>{restaurant.cuisine}</CardDescription>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {restaurant.isOpen ? (
                  <span className="text-orange-500">Closes at {restaurant.closingTime}</span>
                ) : (
                  <span className="text-green-500">Opens at {restaurant.openingTime}</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {restaurant.location}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {restaurant.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {restaurant.reviews} reviews
              </span>
              <Button size="sm" className="px-4 py-2 text-sm z-10 relative">
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}