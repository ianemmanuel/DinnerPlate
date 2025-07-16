"use client"

import { Card } from "@user-webapp/components/ui/card"
import { Button } from "@user-webapp/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@user-webapp/components/ui/dialog"
import { ScrollArea } from "@user-webapp/components/ui/scroll-area"

interface Update {
  title: string
  date: string
  content: string
}

interface Props {
  updates: Update[]
}

export default function RestaurantUpdates({ updates }: Props) {
  return (
    <Card className="p-6 bg-background/80 backdrop-blur-sm border-muted">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold font-serif">Latest Updates</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">View All</Button>
          </DialogTrigger>
          <DialogContent className="bg-background/90 backdrop-blur-sm border-muted max-w-md">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4 p-4">
                {updates.map((update, index) => (
                  <div key={index} className="pb-4 border-b border-muted last:border-0">
                    <h4 className="font-medium">{update.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{update.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">{update.date}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea className="h-[200px]">
        <div className="space-y-4">
          {updates.map((update, index) => (
            <div key={index} className="border-b border-muted last:border-0 pb-4 last:pb-0">
              <h4 className="font-medium">{update.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{update.content}</p>
              <p className="text-xs text-muted-foreground mt-2">{update.date}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
