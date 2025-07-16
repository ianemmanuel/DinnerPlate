import { Badge } from "@user-webapp/components/ui/badge";
import { Award, Leaf, Zap, Flame } from "lucide-react";
import { CategoryStats } from "@user-webapp/components/Categories/CategoryStats"

interface CategoryInfoProps {
  category: {
    name: string;
    description: string;
    tags: string[];
  };
}

export function CategoryInfo({ category }: CategoryInfoProps) {
  return (
    <section className="mb-16 animate-fadeInUp delay-100">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">About This Category</h2>
          <p className="text-muted-foreground mb-6">{category.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {category.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="bg-secondary/30 p-6 rounded-lg border border-border">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Why Choose {category.name}?
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Leaf className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                <span>Nutritionally balanced meals packed with vitamins and minerals</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 mt-0.5 text-yellow-500 flex-shrink-0" />
                <span>Environmentally sustainable food choices</span>
              </li>
              <li className="flex items-start gap-2">
                <Flame className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />
                <span>Innovative flavors that will surprise your taste buds</span>
              </li>
            </ul>
          </div>
        </div>
        
        <CategoryStats category={category} />
      </div>
    </section>
  );
}