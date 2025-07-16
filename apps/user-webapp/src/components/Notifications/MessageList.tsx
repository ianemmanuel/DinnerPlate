"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@user-webapp/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface Message {
  id: string;
  sender: {
    name: string;
    avatar?: string;
    type: "restaurant" | "support" | "system";
  };
  preview: string;
  unread: boolean;
  date: Date;
  isCustomerSupport?: boolean;
}

const messages: Message[] = [
  {
    id: "1",
    sender: {
      name: "Tasty Bites",
      type: "restaurant",
      avatar: "/avatars/restaurant-1.jpg"
    },
    preview: "Hi there! Your meal plan subscription has been processed...",
    unread: true,
    date: new Date(Date.now() - 1000 * 60 * 15)
  },
  {
    id: "2",
    sender: {
      name: "Customer Support",
      type: "support",
      avatar: "/avatars/support-1.jpg"
    },
    preview: "We've received your support request and will get back to you...",
    unread: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isCustomerSupport: true
  },
  {
    id: "3",
    sender: {
      name: "Spice Kitchen",
      type: "restaurant",
      avatar: "/avatars/restaurant-2.jpg"
    },
    preview: "Your order #DP-1246 is being prepared and will be ready for...",
    unread: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: "4",
    sender: {
      name: "Dinner Plate Updates",
      type: "system"
    },
    preview: "New restaurants added in your area - check them out!",
    unread: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48)
  }
];

export default function MessageList({
  filter,
  searchQuery
}: {
  filter: string;
  searchQuery: string;
}) {
  const filteredMessages = messages
    .filter(m => filter === "all" || m.sender.type === filter)
    .filter(m => 
      m.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-4">
      {filteredMessages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No messages found
        </div>
      ) : (
        filteredMessages.map((message) => (
          <Link
            key={message.id}
            href={`/messages/${message.id}`}
            className={`block p-4 rounded-lg border transition-all hover:shadow-sm ${
              message.unread ? "bg-accent/30" : "bg-card"
            }`}
          >
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={message.sender.avatar} />
                <AvatarFallback>
                  {message.sender.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">
                    {message.sender.name}
                    {message.isCustomerSupport && (
                      <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                        Support
                      </span>
                    )}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(message.date, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm mt-1 text-muted-foreground line-clamp-2">
                  {message.preview}
                </p>
              </div>
              {message.unread && (
                <span className="h-2 w-2 rounded-full bg-primary mt-2" />
              )}
            </div>
          </Link>
        ))
      )}
    </div>
  );
}