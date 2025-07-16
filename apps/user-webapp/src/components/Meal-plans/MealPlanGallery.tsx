'use client';

import Image from 'next/image';
import { Badge } from '@user-webapp/components/ui/badge';
import { Flame, Star } from 'lucide-react';
import { useRef } from 'react';

type Props = {
  name: string;
  image: string;
  gallery: string[];
  isPopular: boolean;
  isFeatured: boolean;
  hasDiscount: boolean;
};

export default function MealPlanGallery({ name, image, gallery, isPopular, isFeatured, hasDiscount }: Props) {
  const mainImageRef = useRef<HTMLImageElement | null>(null);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted shadow-md">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-opacity opacity-0 duration-500"
          priority
          ref={mainImageRef}
          onLoad={() => {
            if (mainImageRef.current) {
              mainImageRef.current.classList.remove('opacity-0');
            }
          }}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {isPopular && (
            <Badge variant="secondary" className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
              <Flame className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
          {isFeatured && (
            <Badge variant="secondary" className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          {hasDiscount && <Badge variant="destructive" className="animate-pulse">Sale</Badge>}
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-3 gap-3">
        {gallery
          .filter((url) => url && url.trim() !== '')
          .map((url) => {
            const ref = useRef<HTMLImageElement | null>(null);

            return (
              <div
                key={url}
                className="relative aspect-square rounded-lg overflow-hidden bg-muted shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
              >
                <Image
                  src={url}
                  alt={`${name} ${url}`}
                  fill
                  className="object-cover transition-opacity opacity-0 duration-500"
                  ref={ref}
                  onLoad={() => {
                    if (ref.current) {
                      ref.current.classList.remove('opacity-0');
                    }
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
