// components/MealPlans/MealPlanDetailsTabs.tsx
'use client';

import { Calendar, Clock, CheckCircle, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@user-webapp/components/ui/tabs';
import { Textarea } from '@user-webapp/components/ui/textarea';
import { Button } from '@user-webapp/components/ui/button';
import { Separator } from '@user-webapp/components/ui/separator';
import { StarRating } from '@user-webapp/components/Addons/StarRating';

type Props = {
  rating: number;
  reviews: number;
};

export default function MealPlanDetailsTabs({ rating, reviews }: Props) {
  return (
    <div className="mt-12">
      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50 rounded-lg p-1 h-11">
          <TabsTrigger value="details" className="flex items-center gap-2 text-sm"> 
            <Calendar className="w-4 h-4" />
            Plan Details
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2 text-sm">
            <Star className="w-4 h-4" />
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6 rounded-lg border bg-background shadow-md p-6">
          <div className="bg-background border rounded-lg p-5 shadow-sm space-y-6">
            {/* About */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                About this meal plan
              </h3>
              <p className="text-sm text-foreground/80">
                Our Weekly Sushi Fix is perfect for sushi lovers who want to enjoy fresh,
                high-quality sushi multiple times a week without the hassle of deciding what to order.
                Each delivery comes with a balanced selection of sushi rolls and complementary dishes.
              </p>
            </div>

            {/* How it works */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4" />
                How it works
              </h3>
              <ol className="space-y-2 pl-4 list-disc text-sm text-foreground/80">
                <li>Subscribe to the plan and choose your preferred delivery days</li>
                <li>Our chefs prepare your meals fresh each day</li>
                <li>Meals are delivered to your door during the specified time window</li>
                <li>Enjoy restaurant-quality sushi at home!</li>
              </ol>
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Benefits
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-foreground/80">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-1 text-green-500" /> Save 15% compared to ordering individually</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-1 text-green-500" /> Variety of dishes each week</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-1 text-green-500" /> Flexible subscription - cancel anytime</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-1 text-green-500" /> Free delivery on all orders</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6 rounded-lg border bg-background shadow-md p-6 space-y-6">
          <div className="bg-background border rounded-lg p-5 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold">{rating}</div>
                <StarRating rating={rating} />
                <div className="text-xs text-muted-foreground mt-1">{reviews} reviews</div>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2">
                    <div className="w-8 text-xs">{stars} star{stars !== 1 && 's'}</div>
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${
                          stars >= 4
                            ? 'from-green-400 to-emerald-500'
                            : stars === 3
                            ? 'from-yellow-400 to-amber-500'
                            : 'from-red-400 to-rose-500'
                        }`}
                        style={{ width: `${(stars / 5) * 100}%` }}
                      />
                    </div>
                    <div className="w-8 text-xs text-muted-foreground text-right">
                      {Math.round((stars / 5) * reviews)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-5">
              {[
                { text: 'This meal plan has been a game changer!', rating: 5 },
                { text: 'Enjoying the variety. Could use more options.', rating: 4 },
                { text: 'Good value and reliable delivery.', rating: 4 },
              ].map((review, i) => (
                <div key={i} className="space-y-2 p-3 bg-muted/20 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-medium">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">Customer {i + 1}</div>
                      <div className="flex items-center gap-1">
                        <StarRating rating={review.rating} />
                        <span className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground pl-10">{review.text}</p>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Share your experience</h4>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Your rating</div>
                <StarRating rating={0} />
              </div>
              <Textarea rows={3} placeholder="What did you like or dislike?" />
              <div className="flex justify-end">
                <Button size="sm">Submit Review</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
