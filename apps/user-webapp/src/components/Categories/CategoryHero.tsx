import Image from "next/image";
import { Badge } from "@user-webapp/components/ui/badge";
import { Award, Flame, Star } from "lucide-react";

interface CategoryHeroProps {
  category: {
    name: string;
    image: string;
    description: string;
    isTrending: boolean;
    isPopular: boolean;
  };
}

export function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <section className="relative rounded-xl overflow-hidden mb-16 animate-fadeInUp">
      <div className="aspect-[3/1] relative">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-green-500 text-white">
              <Award className="w-4 h-4 mr-1" />
              Dinner Plate Pick
            </Badge>
            {category.isTrending && (
              <Badge className="bg-orange-500 text-white">
                <Flame className="w-4 h-4 mr-1" />
                Trending
              </Badge>
            )}
            {category.isPopular && (
              <Badge className="bg-primary text-white">
                <Star className="w-4 h-4 mr-1" />
                Popular
              </Badge>
            )}
          </div>
          
          <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
          <p className="text-lg max-w-2xl">{category.description.substring(0, 120)}...</p>
        </div>
      </div>
    </section>
  );
}