"use client"

import { Card } from "@user-webapp/components/ui/card"
import { ScrollArea } from "@user-webapp/components/ui/scroll-area"
import { MapPin } from "lucide-react"

interface Branch {
  name: string
  address: string
}

interface Props {
  branches: Branch[]
}

export default function RestaurantLocations({ branches }: Props) {
  return (
    <Card className="p-6 bg-background/80 backdrop-blur-sm border-muted animate-fadeInUp delay-500">
      <h2 className="text-xl font-semibold mb-4 font-serif">Our Locations</h2>
      <div className="aspect-[16/6] bg-muted/30 rounded-lg mb-6 flex items-center justify-center border border-muted">
        <MapPin className="h-8 w-8 text-muted-foreground" />
      </div>
      <ScrollArea className="h-[200px]">
        <div className="space-y-4">
          {branches.map((branch, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">{branch.name}</h3>
                <p className="text-sm text-muted-foreground">{branch.address}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
