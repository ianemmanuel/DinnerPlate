'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@user-webapp/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader
} from '@user-webapp/components/ui/card';
import { Separator } from '@user-webapp/components/ui/separator';
import { Textarea } from '@user-webapp/components/ui/textarea';
import { Button } from '@user-webapp/components/ui/button';
import { StarRating } from '@user-webapp/components/Addons/StarRating';
import { Meal } from '@user-webapp/types/meal';
import {
  Flame,
  Candy,
  Drumstick,
  Droplet
} from 'lucide-react';

type Props = {
  meal: Meal;
};

export default function MealTabs({ meal }: Props) {
  return (
    <Tabs defaultValue="description" className="mt-12">
      <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-lg h-11">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      {/* DESCRIPTION */}
      <TabsContent
        value="description"
        className="mt-6 rounded-lg border bg-background shadow-md p-6 space-y-6"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              About this meal
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our {meal.name} is made with the freshest ingredients, perfectly balanced for flavor and nutrition. 
              Whether you're craving something spicy, fresh, or satisfying, this dish delivers it all in one bite.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Ingredients
            </h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Sushi-grade tuna</li>
              <li>Spicy mayo (mayonnaise, sriracha, sesame oil)</li>
              <li>Sushi rice</li>
              <li>Nori (seaweed)</li>
              <li>Sesame seeds</li>
              <li>Green onions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Allergens</h3>
            <p className="text-sm text-destructive">Contains: Fish, Soy, Sesame</p>
          </div>
        </div>
      </TabsContent>

      {/* NUTRITION */}
      <TabsContent
        value="nutrition"
        className="mt-6 rounded-lg border bg-background shadow-md p-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Calories', value: '290', icon: <Flame className="text-orange-500 w-4 h-4" /> },
            { label: 'Protein', value: '24g', icon: <Drumstick className="text-green-600 w-4 h-4" /> },
            { label: 'Carbs', value: '38g', icon: <Candy className="text-yellow-500 w-4 h-4" /> },
            { label: 'Fat', value: '7g', icon: <Droplet className="text-blue-500 w-4 h-4" /> }
          ].map(({ label, value, icon }) => (
            <Card key={label} className="text-center shadow-sm">
              <CardHeader className="pb-1 space-y-1">
                <div className="flex justify-center">{icon}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* REVIEWS */}
      <TabsContent
        value="reviews"
        className="mt-6 rounded-lg border bg-background shadow-md p-6 space-y-6"
      >
        {/* Rating Summary */}
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold">{meal.rating}</div>
            <StarRating rating={meal.rating} />
            <div className="text-sm text-muted-foreground mt-1">
              {meal.reviews} reviews
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const width = Math.round((stars / 5) * 100);
              const barColor =
                stars >= 4
                  ? 'bg-green-500'
                  : stars === 3
                  ? 'bg-yellow-500'
                  : 'bg-red-500';

              return (
                <div key={stars} className="flex items-center gap-2">
                  <div className="w-8 text-sm">{stars}★</div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${barColor}`} style={{ width: `${width}%` }} />
                  </div>
                  <div className="w-8 text-sm text-muted-foreground text-right">
                    {Math.round((stars / 5) * meal.reviews)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Example Reviews */}
        <div className="space-y-6">
          {[
            { name: 'Jane D.', comment: 'Incredible quality! So fresh and flavorful.', rating: 5 },
            { name: 'Mike R.', comment: 'Good taste, portion could be bigger.', rating: 4 },
            { name: 'Aisha M.', comment: 'A bit too spicy for me but still good.', rating: 3 }
          ].map((review, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-muted" />
                <div>
                  <div className="font-medium">{review.name}</div>
                  <div className="flex items-center gap-1">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-muted-foreground">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground pl-10">{review.comment}</p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Review Form */}
        <div className="space-y-4">
          <h4 className="font-medium">Write a review</h4>
          <div>
            <div className="mb-1 text-sm text-muted-foreground">Your rating</div>
            <StarRating rating={0} />
          </div>
          <Textarea placeholder="Share your thoughts..." rows={4} />
          <div className="flex justify-end">
            <Button size="sm">Submit Review</Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
