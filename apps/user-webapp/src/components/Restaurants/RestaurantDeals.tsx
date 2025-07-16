"use client"

import { Card } from "@user-webapp/components/ui/card"
import { Button } from "@user-webapp/components/ui/button"
import { ScrollArea } from "@user-webapp/components/ui/scroll-area"
import { Tag } from "lucide-react"

interface Deal {
  title: string
  description: string
  validUntil: string
  code: string
}

interface Props {
  deals: Deal[]
}

export default function RestaurantDeals({ deals }: Props) {
  return (
    <Card className="p-6 bg-background/80 backdrop-blur-sm border-muted">
      <h3 className="font-semibold mb-4 font-serif">Current Deals</h3>
      <ScrollArea className="h-[200px]">
        <div className="space-y-4">
          {deals.map((deal, index) => (
            <div key={index} className="p-3 rounded-lg border border-muted bg-gradient-to-br from-background to-muted/20 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{deal.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{deal.description}</p>
                </div>
                <Tag className="h-4 w-4 text-primary flex-shrink-0" />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Valid until {new Date(deal.validUntil).toLocaleDateString()}
                </span>
                <Button variant="outline" size="sm" className="font-mono">
                  {deal.code}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
