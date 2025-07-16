"use client"

import { Phone, Mail } from "lucide-react"
import { Card } from "@user-webapp/components/ui/card"

interface RestaurantAboutProps {
  description: string
  phone: string
  email: string
}

export default function RestaurantAbout({ description, phone, email }: RestaurantAboutProps) {
  return (
    <Card className="p-6 bg-background/80 backdrop-blur-sm border-muted">
      <h2 className="text-xl font-semibold mb-4 font-serif">About Us</h2>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{email}</span>
        </div>
      </div>
    </Card>
  )
}
