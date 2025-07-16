"use client"

import Image from "next/image"

interface RestaurantHeroProps {
  name: string
  coverImage: string
  profileImage: string
}

export default function RestaurantHero({ name, coverImage, profileImage }: RestaurantHeroProps) {
  return (
    <div className="relative h-[400px] w-full">
      <Image
        src={coverImage}
        alt={name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-32">
        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-background shadow-lg">
          <Image
            src={profileImage}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
