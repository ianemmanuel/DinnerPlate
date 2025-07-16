"use client"

import { Card } from "@user-webapp/components/ui/card"
import { Button } from "@user-webapp/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@user-webapp/components/ui/dialog"
import { ScrollArea } from "@user-webapp/components/ui/scroll-area"
import { Trophy } from "lucide-react"

interface Achievement {
  title: string
  date: string
  description: string
}

interface Props {
  achievements: Achievement[]
}

export default function RestaurantAchievements({ achievements }: Props) {
  return (
    <Card className="p-6 bg-background/80 backdrop-blur-sm border-muted">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold font-serif">Achievements</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">View All</Button>
          </DialogTrigger>
          <DialogContent className="bg-background/90 backdrop-blur-sm border-muted max-w-md">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4 p-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-3 pb-4 border-b border-muted last:border-0">
                    <Trophy className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea className="h-[200px]">
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex gap-3">
              <Trophy className="h-5 w-5 text-yellow-400 flex-shrink-0" />
              <div>
                <h4 className="font-medium">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
