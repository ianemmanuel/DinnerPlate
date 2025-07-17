'use client'
import { Card } from "@user-webapp/components/ui/card";
import { Button } from "@user-webapp/components/ui/button";
import { Calendar } from "lucide-react";
import { MealPlanGrid } from "@user-webapp/components/Meal-plans/MealPlanGrid";
import { MealPlan } from "@user-webapp/types/meal-plan";


type MealPlansTabProps = {
  plans: MealPlan[];
}

export function MealPlansTab({ plans }: MealPlansTabProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" /> Saved Meal Plans ({plans.length})
        </h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      <MealPlanGrid plans={plans} wishlist={[]} onWishlistToggle={() => {}} />
    </Card>
  );
}
