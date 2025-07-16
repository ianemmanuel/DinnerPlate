import { Progress } from '@restaurant-webapp/components/ui/progress';

const meals = [
  {
    name: 'Mediterranean Bowl',
    orders: 234,
    revenue: 4680,
    percentage: 85,
  },
  {
    name: 'Grilled Salmon',
    orders: 189,
    revenue: 3780,
    percentage: 70,
  },
  {
    name: 'Chicken Teriyaki',
    orders: 156,
    revenue: 3120,
    percentage: 58,
  },
  {
    name: 'Vegan Buddha Bowl',
    orders: 143,
    revenue: 2860,
    percentage: 53,
  },
  {
    name: 'Pasta Primavera',
    orders: 98,
    revenue: 1960,
    percentage: 36,
  },
];

export function TopMeals() {
  return (
    <div className="space-y-6">
      {meals.map((meal, index) => (
        <div key={meal.name} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{meal.name}</span>
            <span className="text-muted-foreground">{meal.orders} orders</span>
          </div>
          <Progress value={meal.percentage} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>${meal.revenue} revenue</span>
            <span>{meal.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}