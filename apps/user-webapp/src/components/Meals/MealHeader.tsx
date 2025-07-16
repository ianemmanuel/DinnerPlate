'use client';

import { Star, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Badge } from '@user-webapp/components/ui/badge';
import Link from 'next/link';
import { Meal } from '@user-webapp/types/meal';
import { getMealDetails } from '@user-webapp/app/data/meals';

type Props = {
  meal: Meal;
  hasDiscount: boolean;
};

export default function MealHeader({ hasDiscount }: Props) {
    const meal = getMealDetails()
  const discountPercent =
    meal.originalPrice && !isNaN(Number(meal.originalPrice)) && !isNaN(Number(meal.price))
      ? Math.round(
          (1 - parseFloat(meal.price) / parseFloat(meal.originalPrice)) * 100
        )
      : null;

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/restaurants/${meal.restaurantSlug}`}
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <MapPin className="w-4 h-4 mr-1" />
          {meal.restaurant}
          <ChevronRight className="w-3 h-3 ml-1" />
        </Link>
        <h1 className="text-3xl font-bold mt-2">{meal.name}</h1>
        <div className="flex items-center mt-2 gap-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-medium">{meal.rating}</span>
            <span className="text-muted-foreground text-sm ml-1">({meal.reviews} reviews)</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {meal.prepTime}
          </div>
          <Badge variant="outline" className="text-sm">{meal.category}</Badge>
        </div>
      </div>

      <div className="space-y-4">
        {hasDiscount && (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-destructive">{meal.price}</span>
            <span className="text-lg line-through text-muted-foreground">{meal.originalPrice}</span>
            {discountPercent !== null && (
              <Badge variant="destructive" className="ml-2">{discountPercent}% OFF</Badge>
            )}
          </div>
        )}
        {!hasDiscount && (
          <span className="text-2xl font-bold">{meal.price}</span>
        )}

        <p className="text-muted-foreground">{meal.description}</p>

        {meal.tags && (
          <div className="flex flex-wrap gap-2">
            {meal.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
