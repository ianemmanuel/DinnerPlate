
import { Card, CardContent } from '@user-webapp/components/ui/card';
import { Calendar, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MealPlanPreview } from '@user-webapp/types/meal';

type Props = {
  plans: MealPlanPreview[];
};

export default function MealPlanSuggestions({ plans }: Props) {
  return (
    <div className="pt-6">
      <h3 className="font-medium flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5" />
        Also available in these meal plans
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {plans.map((plan) => (
          <Link key={plan.id} href={`/meal-plans/${plan.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-md overflow-hidden">
                  <Image
                    src={plan.image}
                    alt={plan.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{plan.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {plan.price} {plan.pricePer} • {plan.subscribers} subscribers
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
