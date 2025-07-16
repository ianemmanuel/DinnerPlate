import { Button } from "@user-webapp/components/ui/button";

interface CategoryCTAProps {
  categoryName: string;
}

export function CategoryCTA({ categoryName }: CategoryCTAProps) {
  return (
    <section className="bg-primary/5 rounded-xl p-8 text-center animate-fadeInUp delay-500">
      <h2 className="text-2xl font-semibold mb-2">Ready to explore {categoryName}?</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        Discover hundreds of delicious options waiting for you. Whether you're a long-time plant-based eater or just curious, we've got something for everyone.
      </p>
      <div className="flex justify-center gap-4">
        <Button size="lg" className="px-6">
          Browse All Meals
        </Button>
        <Button size="lg" variant="outline" className="px-6">
          Explore Meal Plans
        </Button>
      </div>
    </section>
  );
}