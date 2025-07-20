import Link from "next/link"
import Image from "next/image"
import { Card } from "@user-webapp/components/ui/card"
import clsx from "clsx"

interface CategoryCardProps {
  category: {
    name: string
    image: string
    itemCount: number
    restaurant: string
    isSpicy?: boolean
  }
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const slug = category.name.toLowerCase().replace(/\s+/g, '-')

  return (
    <Link href={`/categories/${slug}`} className="block w-full min-w-[280px]">
      <Card className="overflow-hidden group relative h-full transition-shadow hover:shadow-lg">
        <div className="aspect-[4/3] relative">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,..."
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-semibold text-lg">{category.name}</h3>
            <p className="text-sm text-gray-300">{category.itemCount} items</p>
            <p
              className={clsx(
                "text-sm font-medium mt-1",
                category.isSpicy ? "text-orange-300 italic" : "text-gray-300"
              )}
            >
              {category.isSpicy ? "By Spicy ✨" : `By ${category.restaurant}`}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
