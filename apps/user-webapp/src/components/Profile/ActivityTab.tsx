import { Card } from "@user-webapp/components/ui/card";
import { Heart, History, Star, Tag } from "lucide-react";
import { Separator } from "@user-webapp/components/ui/separator";
import React from "react";
import { ReactNode } from "react"

type ActivityItemProps = {
  icon: ReactNode
  title: string
  description: string
  time: string
}


function ActivityItem({ icon, title, description, time }: ActivityItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex items-start pt-0.5">
        <div className="p-2 rounded-full bg-primary/10">{icon}</div>
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  );
}

export function ActivityTab() {
  const activities = [
    {
      icon: <Heart className="h-5 w-5 text-rose-500" />,
      title: "Added to wishlist",
      description: "Truffle Mushroom Pasta from Bella Vista",
      time: "2 hours ago",
    },
    {
      icon: <Tag className="h-5 w-5 text-emerald-500" />,
      title: "Saved deal",
      description: "20% off all pasta dishes",
      time: "1 day ago",
    },
    {
      icon: <Star className="h-5 w-5 text-amber-500" />,
      title: "Followed restaurant",
      description: "Mediterranean Breeze",
      time: "3 days ago",
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <History className="h-5 w-5" /> Recent Activity
      </h2>
      <div className="space-y-6">
        {activities.map((act, idx) => (
          <React.Fragment key={idx}>
            <ActivityItem {...act} />
            {idx < activities.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
}
