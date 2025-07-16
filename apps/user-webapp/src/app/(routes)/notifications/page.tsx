"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@user-webapp/components/ui/card";
import { Input } from "@user-webapp/components/ui/input";
import { Badge } from "@user-webapp/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@user-webapp/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@user-webapp/components/ui/select";
import { Bell, Mail, Search, Clock, Star, Zap, Check, AlertTriangle } from "lucide-react";
import Image from "next/image";

import { formatDistanceToNow } from "date-fns";

type Notification = {
  id: number;
  type: "order" | "promotion" | "support" | "system";
  title: string;
  message: string;
  read: boolean;
  date: Date;
  action?: {
    href: string;
    label: string;
  };
  icon?: string;
};

type Message = {
  id: number;
  sender: {
    name: string;
    avatar?: string;
    type: "restaurant" | "support" | "system";
  };
  preview: string;
  unread: boolean;
  date: Date;
  isCustomerSupport?: boolean;
};

const notifications: Notification[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    type: "system",
    title: "New Feature",
    message: "Meal plan subscriptions now available for all restaurants",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: 4,
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

const messages: Message[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
    sender: {
      name: "Dinner Plate Updates",
      type: "system"
    },
    preview: "New restaurants added in your area - check them out!",
    unread: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48)
  }
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "order":
      return <Check className="h-4 w-4 text-green-500" />;
    case "promotion":
      return <Star className="h-4 w-4 text-yellow-500" />;
    case "system":
      return <Zap className="h-4 w-4 text-blue-500" />;
    case "support":
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("notifications");

  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         n.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || n.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredMessages = messages.filter(m => {
    const matchesSearch = m.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         m.preview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || m.sender.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-6 py-8 lg:px-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Notifications</h1>
        <p className="text-muted-foreground text-lg">Your recent updates and messages</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {activeTab === "notifications" ? (
                  <>
                    <SelectItem value="order">Orders</SelectItem>
                    <SelectItem value="promotion">Promotions</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="restaurant">Restaurants</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs 
        defaultValue="notifications" 
        className="mb-8"
        onValueChange={(value) => {
          setActiveTab(value);
          setSelectedFilter("all");
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Messages
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications" className="mt-6">
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No notifications found
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`p-4 transition-all hover:shadow-sm ${
                    notification.read ? "bg-card" : "bg-accent/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{notification.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatDistanceToNow(notification.date, { addSuffix: true })}</span>
                        </div>
                      </div>
                      <p className="text-sm mt-1 text-muted-foreground">
                        {notification.message}
                      </p>
                      {notification.action && (
                        <div className="mt-3">
                          <Link
                            href={notification.action.href}
                            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                          >
                            {notification.action.label}
                          </Link>
                        </div>
                      )}
                    </div>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-primary mt-2" />
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="messages" className="mt-6">
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
                  className="block"
                >
                  <Card
                    className={`p-4 transition-all hover:shadow-sm ${
                      message.unread ? "bg-accent/30" : "bg-card"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {message.sender.avatar ? (
                          <Image
                            src={message.sender.avatar}
                            alt={message.sender.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {message.sender.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">
                              {message.sender.name}
                            </h3>
                            {message.isCustomerSupport && (
                              <Badge variant="secondary" className="text-xs">
                                Support
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{formatDistanceToNow(message.date, { addSuffix: true })}</span>
                          </div>
                        </div>
                        <p className="text-sm mt-1 text-muted-foreground line-clamp-2">
                          {message.preview}
                        </p>
                      </div>
                      {message.unread && (
                        <span className="h-2 w-2 rounded-full bg-primary mt-2" />
                      )}
                    </div>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}