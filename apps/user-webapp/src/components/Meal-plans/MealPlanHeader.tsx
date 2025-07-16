// components/MealPlans/MealPlanHeader.tsx
'use client';

import Link from 'next/link';
import { MapPin, ChevronRight, Star, Calendar, Clock } from 'lucide-react';
import { Badge } from '@user-webapp/components/ui/badge';

type Props = {
  plan: {
    name: string;
    restaurant: string;
    restaurantSlug: string;
    rating: number;
    reviews: number;
    price: string;
    originalPrice?: string;
    pricePer: string;
    cycles: number;
    description: string;
    deliveryDays: string[];
    deliveryWindow: string;
    subscribers: number;
  };
  hasDiscount: boolean;
};

export default function MealPlanHeader({ plan, hasDiscount }: Props) {
  return (
    <div className="space-y-6 text-foreground">
      {/* Restaurant Link + Title + Stats */}
      <div className="space-y-3">
        <Link
          href={`/restaurants/${plan.restaurantSlug}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <MapPin className="w-4 h-4 mr-1" />
          {plan.restaurant}
          <ChevronRight className="w-3 h-3 ml-1" />
        </Link>

        <h1 className="text-4xl font-bold leading-tight tracking-tight">{plan.name}</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-semibold">{plan.rating}</span>
            <span className="text-muted-foreground text-sm ml-1">({plan.reviews} reviews)</span>
          </div>
          <Badge variant="outline" className="text-xs">{plan.subscribers} subscribers</Badge>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-muted/40 p-4 rounded-lg space-y-2">
        {hasDiscount ? (
          <div className="flex items-center gap-2 text-2xl font-bold text-destructive">
            {plan.price}
            <span className="text-lg line-through text-muted-foreground font-normal">
              {plan.originalPrice}
            </span>
            <Badge variant="destructive" className="text-xs ml-2">
              10% OFF
            </Badge>
          </div>
        ) : (
          <div className="text-2xl font-bold">{plan.price}</div>
        )}
        <div className="text-sm text-muted-foreground">
          {plan.price}/ {plan.cycles} cycle{plan.cycles > 1 ? 's' : ''}
        </div>
      </div>

      {/* Description */}
      <p className="text-base text-muted-foreground leading-relaxed">{plan.description}</p>

      {/* Delivery Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-md">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <div>
            <div className="text-xs text-muted-foreground">Delivery Days</div>
            <div className="text-sm font-medium">{plan.deliveryDays.join(', ')}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-md">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <div>
            <div className="text-xs text-muted-foreground">Delivery Window</div>
            <div className="text-sm font-medium">{plan.deliveryWindow}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
