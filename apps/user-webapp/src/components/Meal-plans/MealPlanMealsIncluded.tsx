// components/MealPlans/MealPlanMealsIncluded.tsx
'use client';

import Image from 'next/image';
import { Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@user-webapp/components/ui/card';

type Props = {
  meals: {
    day: string;
    meals: {
      id:  string | number;
      name: string;
      description: string;
      image: string;
      price: string;
    }[];
  }[];
};

export default function MealPlanMealsIncluded({ meals }: Props) {
  return (
    <div className="pt-10">
      <h3 className="font-medium flex items-center gap-2 mb-4 text-xl">
        <Utensils className="w-5 h-5" />
        What's included
      </h3>
      <div className="space-y-4">
        {meals.map((dayPlan) => (
          <Card key={dayPlan.day} className="overflow-hidden">
            <CardHeader className="bg-muted/50 p-4">
              <h4 className="font-medium">{dayPlan.day}</h4>
            </CardHeader>
            <CardContent className="p-0">
              {dayPlan.meals.map((meal) => (
                <div
                  key={meal.id}
                  className="p-4 border-b last:border-b-0 flex items-start gap-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
                    <Image
                      src={meal.image}
                      alt={meal.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium">{meal.name}</h5>
                    <p className="text-sm text-muted-foreground">{meal.description}</p>
                  </div>
                  <div className="text-sm font-medium">{meal.price}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
