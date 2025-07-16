import Link from "next/link"
import Image from "next/image"
import { Card } from "@user-webapp/components/ui/card"
import { Badge } from "@user-webapp/components/ui/badge"
import { Flame, Award, Check } from "lucide-react"
import clsx from "clsx"
import { Category } from "@user-webapp/types/category"

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const slug = category.name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Link 
      href={`/categories/${slug}`} 
      className="group block cursor-pointer"
    >
      <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg">
        <div className="aspect-[4/3] relative">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Top Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {category.isSponsored && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900">
                <Award className="w-3 h-3 mr-1" />
                Sponsored
              </Badge>
            )}
            {category.isTrending && (
              <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
                <Flame className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
            {category.isPlatform && (
              <Badge className="bg-green-500 text-white">
                <Check className="w-3 h-3 mr-1" />
                Dinner Plate
              </Badge>
            )}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div>
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <p className="text-sm text-gray-300">{category.itemCount} items</p>
            </div>
            
            <p className={clsx("text-sm font-medium mt-1", "text-gray-300")}>
              {category.isPlatform ? "Dinner Plate Pick ✨" : `By ${category.restaurant}`}
            </p>
            
            {category.tags && (
              <div className="flex flex-wrap gap-1 mt-2">
                {category.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-xs bg-white/20 border-white/30 text-white"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}