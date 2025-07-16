"use client"

import { Card } from "@user-webapp/components/ui/card"
import { Button } from "@user-webapp/components/ui/button"
import { Star } from "lucide-react"

interface Props {
  userRating: number
  setUserRating: (val: number) => void
}

export default function RestaurantRating({ userRating, setUserRating }: Props) {
  return (
    <Card className="p-6 bg-background/80 backdrop-blur-sm border-muted">
      <h3 className="font-semibold mb-4 font-serif">Rate Us</h3>
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            key={star}
            variant="ghost"
            size="icon"
            onClick={() => setUserRating(star)}
            className="hover:bg-transparent"
          >
            <Star
              className="h-6 w-6"
              fill={star <= userRating ? "currentColor" : "none"}
            />
          </Button>
        ))}
      </div>
      <Button className="w-full" disabled={userRating === 0}>
        Submit Rating
      </Button>
    </Card>
  )
}
