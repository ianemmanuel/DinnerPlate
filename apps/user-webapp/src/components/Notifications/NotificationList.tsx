"use client";

import { Button } from "@user-webapp/components/ui/button";
import { Check, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface Notification {
  id: string;
  type: "order" | "promotion" | "system" | "support";
  title: string;
  message: string;
  read: boolean;
  date: Date;
  action?: {
    href: string;
    label: string;
  };
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Order Confirmed",
    message: "Your order #DP-1245 has been confirmed by Tasty Bites",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 5),
    action: {
      href: "/orders/DP-1245",
      label: "View Order"
    }
  },
  {
    id: "2",
    type: "promotion",
    title: "Special Offer",
    message: "Get 20% off your next meal plan subscription this week only!",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    action: {
      href: "/promotions",
      label: "View Offer"
    }
  },
  {
    id: "3",
    type: "system",
    title: "New Feature",
    message: "Meal plan subscriptions now available for all restaurants",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "4",
    type: "support",
    title: "Support Request",
    message: "Your support ticket #ST-789 has been resolved",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48),
    action: {
      href: "/support/ST-789",
      label: "View Ticket"
    }
  }
];

const getIcon = (type: Notification["type"]) => {
  switch (type) {
    case "order":
      return <Check className="h-5 w-5 text-green-500" />;
    case "promotion":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "system":
      return <Check className="h-5 w-5 text-blue-500" />;
    case "support":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    default:
      return <Check className="h-5 w-5" />;
  }
};

export default function NotificationList({
  filter,
  searchQuery
}: {
  filter: string;
  searchQuery: string;
}) {
  const filteredNotifications = notifications
    .filter(n => filter === "all" || n.type === filter)
    .filter(n => 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      n.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-4">
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No notifications found
        </div>
      ) : (
        filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border transition-all hover:shadow-sm ${
              notification.read ? "bg-card" : "bg-accent/30"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(notification.date, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm mt-1 text-muted-foreground">
                  {notification.message}
                </p>
                {notification.action && (
                  <div className="mt-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={notification.action.href}>
                        {notification.action.label}
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
              {!notification.read && (
                <span className="h-2 w-2 rounded-full bg-primary mt-2" />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}