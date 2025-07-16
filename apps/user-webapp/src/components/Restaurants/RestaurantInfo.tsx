"use client"

import { Star, Clock, Instagram, Facebook, Twitter, Heart, Mail, Share2 } from "lucide-react"
import { Button } from "@user-webapp/components/ui/button"

interface RestaurantInfoProps {
  name: string
  rating: number
  reviews: number
  hours: string
  social: {
    instagram: string
    facebook: string
    twitter: string
  }
  isFollowing: boolean
  setIsFollowing: (val: boolean) => void
  isSubscribed: boolean
  setIsSubscribed: (val: boolean) => void
}

export default function RestaurantInfo({
  name,
  rating,
  reviews,
  hours,
  social,
  isFollowing,
  setIsFollowing,
  isSubscribed,
  setIsSubscribed
}: RestaurantInfoProps) {
  return (
    <div className="text-center mb-8 animate-fadeInUp">
      <h1 className="text-3xl font-bold mb-2 font-serif tracking-tight">{name}</h1>
      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{rating}</span>
          <span>({reviews.toLocaleString()} reviews)</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{hours}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
        <a href={`https://instagram.com/${social.instagram}`} target="_blank" rel="noopener noreferrer">
          <Instagram className="h-5 w-5 hover:text-pink-600 transition-colors" />
        </a>
        <a href={`https://facebook.com/${social.facebook}`} target="_blank" rel="noopener noreferrer">
          <Facebook className="h-5 w-5 hover:text-blue-600 transition-colors" />
        </a>
        <a href={`https://twitter.com/${social.twitter}`} target="_blank" rel="noopener noreferrer">
          <Twitter className="h-5 w-5 hover:text-blue-400 transition-colors" />
        </a>
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button 
          variant={isFollowing ? "outline" : "default"}
          onClick={() => setIsFollowing(!isFollowing)}
          className="gap-2"
        >
          <Heart className="h-4 w-4" fill={isFollowing ? "currentColor" : "none"} />
          {isFollowing ? "Following" : "Follow"}
        </Button>
        <Button 
          variant={isSubscribed ? "outline" : "default"}
          onClick={() => setIsSubscribed(!isSubscribed)}
          className="gap-2"
        >
          <Mail className="h-4 w-4" />
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </Button>
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
}
