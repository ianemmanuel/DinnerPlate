'use client';

import Image from 'next/image';
import { Badge } from '@user-webapp/components/ui/badge';
import { Flame, Leaf } from 'lucide-react';
import { Meal } from '@user-webapp/types/meal';

type Props = {
  meal: Meal;
  hasDiscount: boolean;
};

export default function MealGallery({ meal, hasDiscount }: Props) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-muted shadow-md">
        <Image
          src={meal.image}
          alt={meal.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {meal.isPopular && (
            <Badge variant="secondary" className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
              <Flame className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
          {meal.isHealthy && (
            <Badge variant="secondary" className="bg-gradient-to-r from-green-400 to-teal-500 text-white">
              <Leaf className="w-3 h-3 mr-1" />
              Healthy
            </Badge>
          )}
          {hasDiscount && (
            <Badge variant="destructive" className="animate-pulse">
              Sale
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {meal.gallery?.map((imgUrl, index) => (
          <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-muted">
            <Image
              src={imgUrl}
              alt={`${meal.name} gallery image ${index + 1}`}
              fill
              className="object-cover transition-opacity opacity-0 duration-500"
              onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
