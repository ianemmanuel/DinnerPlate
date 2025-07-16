"use client"

import { Clock } from "lucide-react"
import { Card } from "@user-webapp/components/ui/card"

interface DaySchedule {
  day: string
  hours: string
}

interface RestaurantOpeningHoursProps {
  schedule: DaySchedule[]
}

export default function RestaurantOpeningHours({ schedule }: RestaurantOpeningHoursProps) {
  return (
    <Card className="p-6 bg-background/80 backdrop-blur-sm border-muted">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="font-semibold font-serif">Opening Hours</h3>
      </div>
      <div className="space-y-2">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-2 py-1 rounded-md hover:bg-muted/20 transition-colors"
          >
            <span className="text-sm font-medium">{item.day}</span>
            <span className="text-sm text-muted-foreground">{item.hours}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
