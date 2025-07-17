'use client'

import { useState } from 'react'
import type { Meal } from "@user-webapp/types/meal" // replace with actual path
import { MealCard } from '@user-webapp/components/Meals/MealCard'

type WishlistTabProps = {
  meals: Meal[];
  wishlist: number[];
};

export function WishlistTab({ meals, wishlist }: WishlistTabProps) {
  const [wishlistIds, setWishlistIds] = useState<number[]>(wishlist);

  const onWishlistToggle = (id: number) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          isWishlisted={wishlistIds.includes(meal.id)}
          onWishlistToggle={() => onWishlistToggle(meal.id)}
        />
      ))}
    </div>
  );
}
