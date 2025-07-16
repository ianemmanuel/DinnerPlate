'use client'

import { useState } from 'react'
import { Button } from '@restaurant-webapp/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card'
import { Badge } from '@restaurant-webapp/components/ui/badge'
import { Switch } from '@restaurant-webapp/components/ui/switch'
import { Label } from '@restaurant-webapp/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@restaurant-webapp/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@restaurant-webapp/components/ui/tabs'
import { 
  Bell, 
  CheckCircle,
  AlertTriangle,
  Info,
  Star,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  Trash2,
  MarkAsRead
} from 'lucide-react'

const notifications = [
  {
    id: 1,
    type: 'order',
    title: 'New Order Received',
    message: 'Order #ORD-001 from Sarah Johnson for Mediterranean Bowl',
    timestamp: '2024-01-15 14:30',
    read: false,
    priority: 'high',
    icon: ShoppingCart,
    actionRequired: true,
  },
  {
    id: 2,
    type: 'review',
    title: 'New 5-Star Review',
    message: 'Michael Chen left a 5-star review for Grilled Salmon',
    timestamp: '2024-01-15 12:15',
    read: false,
    priority: 'medium',
    icon: Star,
    actionRequired: false,
  },
  {
    id: 3,
    type: 'inventory',
    title: 'Low Stock Alert',
    message: 'Organic Quinoa is running low (8 lbs remaining)',
    timestamp: '2024-01-15 10:45',
    read: true,
    priority: 'high',
    icon: AlertTriangle,
    actionRequired: true,
  },
  {
    id: 4,
    type: 'customer',
    title: 'New Customer Registration',
    message: 'Emma Wilson just signed up for meal plans',
    timestamp: '2024-01-15 09:20',
    read: true,
    priority: 'low',
    icon: Users,
    actionRequired: false,
  },
  {
    id: 5,
    type: 'message',
    title: 'Customer Message',
    message: 'James Rodriguez sent a message about delivery timing',
    timestamp: '2024-01-14 16:30',
    read: false,
    priority: 'medium',
    icon: MessageSquare,
    actionRequired: true,
  },
  {
    id: 6,
    type: 'system',
    title: 'System Update',
    message: 'New analytics dashboard features are now available',
    timestamp: '2024-01-14 10:00',
    read: true,
    priority: 'low',
    icon: Info,
    actionRequired: false,
  },
];

const notificationSettings = {
  orders: {
    email: true,
    push: true,
    sms: false,
  },
  reviews: {
    email: true,
    push: true,
    sms: false,
  },
  inventory: {
    email: true,
    push: true,
    sms: true,
  },
  customers: {
    email: false,
    push: true,
    sms: false,
  },
  messages: {
    email: true,
    push: true,
    sms: false,
  },
  system: {
    email: false,
    push: true,
    sms: false,
  },
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'secondary';
    case 'low':
      return 'outline';
    default:
      return 'outline';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'order':
      return 'default';
    case 'review':
      return 'secondary';
    case 'inventory':
      return 'destructive';
    case 'customer':
      return 'outline';
    case 'message':
      return 'secondary';
    case 'system':
      return 'outline';
    default:
      return 'outline';
  }
};

export default function NotificationsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [settings, setSettings] = useState(notificationSettings);

  const filteredNotifications = notifications.filter(notification => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unread') return !notification.read;
    if (selectedFilter === 'action-required') return notification.actionRequired;
    return notification.type === selectedFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired && !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  const updateSetting = (category: string, type: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: value,
      },
    }));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Stay updated with important restaurant activities and alerts
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{notifications.length}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Unread</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-orange-600">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Action Required</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-red-600">{actionRequiredCount}</div>
            <p className="text-xs text-muted-foreground">
              Immediate action
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">High Priority</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-red-600">{highPriorityCount}</div>
            <p className="text-xs text-muted-foreground">
              Urgent items
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications" className="text-xs md:text-sm">Notifications</TabsTrigger>
          <TabsTrigger value="settings" className="text-xs md:text-sm">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter notifications" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Notifications</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="action-required">Action Required</SelectItem>
                <SelectItem value="order">Orders</SelectItem>
                <SelectItem value="review">Reviews</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="customer">Customers</SelectItem>
                <SelectItem value="message">Messages</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark All Read
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`${
                  !notification.read ? 'border-primary/50 bg-primary/5' : ''
                } ${
                  notification.actionRequired && !notification.read ? 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950' : ''
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`p-2 rounded-lg ${
                        notification.priority === 'high' ? 'bg-red-100 dark:bg-red-900' :
                        notification.priority === 'medium' ? 'bg-orange-100 dark:bg-orange-900' :
                        'bg-blue-100 dark:bg-blue-900'
                      }`}>
                        <notification.icon className={`h-4 w-4 ${
                          notification.priority === 'high' ? 'text-red-600 dark:text-red-400' :
                          notification.priority === 'medium' ? 'text-orange-600 dark:text-orange-400' :
                          'text-blue-600 dark:text-blue-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm md:text-base truncate">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={getTypeColor(notification.type)} className="text-xs">
                            {notification.type}
                          </Badge>
                          <Badge variant={getPriorityColor(notification.priority)} className="text-xs">
                            {notification.priority}
                          </Badge>
                          {notification.actionRequired && (
                            <Badge variant="destructive" className="text-xs">
                              Action Required
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                      <div className="flex gap-1">
                        {!notification.read && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                {notification.actionRequired && !notification.read && (
                  <CardContent className="pt-0">
                    <div className="flex gap-2">
                      <Button size="sm">Take Action</Button>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you want to receive different types of notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(settings).map(([category, categorySettings]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-medium capitalize flex items-center gap-2">
                      {category === 'orders' && <ShoppingCart className="h-4 w-4" />}
                      {category === 'reviews' && <Star className="h-4 w-4" />}
                      {category === 'inventory' && <AlertTriangle className="h-4 w-4" />}
                      {category === 'customers' && <Users className="h-4 w-4" />}
                      {category === 'messages' && <MessageSquare className="h-4 w-4" />}
                      {category === 'system' && <Settings className="h-4 w-4" />}
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <div className="grid gap-4 md:grid-cols-3 pl-6">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${category}-email`} className="text-sm">
                          Email
                        </Label>
                        <Switch
                          id={`${category}-email`}
                          checked={categorySettings.email}
                          onCheckedChange={(checked) => updateSetting(category, 'email', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${category}-push`} className="text-sm">
                          Push
                        </Label>
                        <Switch
                          id={`${category}-push`}
                          checked={categorySettings.push}
                          onCheckedChange={(checked) => updateSetting(category, 'push', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${category}-sms`} className="text-sm">
                          SMS
                        </Label>
                        <Switch
                          id={`${category}-sms`}
                          checked={categorySettings.sms}
                          onCheckedChange={(checked) => updateSetting(category, 'sms', checked)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Quiet Hours</CardTitle>
              <CardDescription>
                Set times when you don't want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
                  <Switch id="quiet-hours" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="22:00">10:00 PM</SelectItem>
                        <SelectItem value="23:00">11:00 PM</SelectItem>
                        <SelectItem value="00:00">12:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="06:00">6:00 AM</SelectItem>
                        <SelectItem value="07:00">7:00 AM</SelectItem>
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>Save Preferences</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}