"use client"

import Image from "next/image"
import { Card } from "@user-webapp/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@user-webapp/components/ui/carousel"

interface RestaurantGalleryProps {
  images: string[]
  name: string
}

export default function RestaurantGallery({ images, name }: RestaurantGalleryProps) {
  return (
    <Card className="p-6 bg-background/80 backdrop-blur-sm border-muted">
      <h2 className="text-xl font-semibold mb-4 font-serif">Gallery</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-[16/9] relative rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={image}
                  alt={`${name} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-opacity opacity-0 duration-500"
                    onLoad={(event) => {
                        const img = event.currentTarget
                        img.classList.remove("opacity-0")
                    }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Card>
  )
}
