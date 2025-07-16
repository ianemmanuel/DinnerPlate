import Link from "next/link";
import Image from "next/image";
import { Card } from "@user-webapp/components/ui/card";

interface RestaurantCardProps {
  restaurant: {
    name: string;
    image: string;
    cuisine: string;
    price: string;
    rating: number | string;
    reviews: number;
    isOpen: boolean;
    closeTime?: string;
    openTime?: string;
  };
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const slug = restaurant.name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Link href={`/restaurants/${slug}`} className="min-w-[280px] block">
      <Card className="overflow-hidden group h-full">
        <div className="aspect-video relative">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2U2ZTZlNiIvPjwvc3ZnPg=="
          />
          <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
            restaurant.isOpen 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-500 text-white'
          }`}>
            {restaurant.isOpen ? `Open until ${restaurant.closeTime}` : `Opens at ${restaurant.openTime}`}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{restaurant.name}</h3>
          <p className="text-sm text-muted-foreground">
            {restaurant.cuisine} • {restaurant.price}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm">★ {restaurant.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({restaurant.reviews}+ reviews)
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}