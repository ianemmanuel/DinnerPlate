'use client';

import { Flame } from 'lucide-react';
import { MealCard } from '@user-webapp/components/Meals/MealCard';
import { getRecommendedMeals } from '@user-webapp/app/data/meals';
import { useState } from 'react';

export default function MealRecommended() {
  const meals = getRecommendedMeals();

  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((mealId) => mealId !== id) : [...prev, id]
    );
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Flame className="w-6 h-6 text-orange-500" />
        You might also like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            isWishlisted={wishlist.includes(meal.id)}
            onWishlistToggle={toggleWishlist}
          />
        ))}
      </div>
    </div>
  );
}
