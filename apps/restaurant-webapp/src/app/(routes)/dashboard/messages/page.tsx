'use client'

import { useState } from 'react'
import { Button } from '@restaurant-webapp/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card'
import { Input } from '@restaurant-webapp/components/ui/input'
import { Badge } from '@restaurant-webapp/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@restaurant-webapp/components/ui/avatar'
import { Textarea } from '@restaurant-webapp/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@restaurant-webapp/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@restaurant-webapp/components/ui/tabs'
import { 
  MessageSquare, 
  Send, 
  Search,
  Star,
  Clock,
  AlertCircle,
  CheckCircle,
  Shield,
  User,
  Phone,
  Mail
} from 'lucide-react'

const messages = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    senderType: 'customer',
    avatar: '/avatars/01.png',
    initials: 'SJ',
    subject: 'Issue with my Mediterranean Bowl order',
    preview: 'Hi, I received my order but the bowl was missing the feta cheese...',
    content: 'Hi, I received my order but the bowl was missing the feta cheese. I specifically ordered the Mediterranean Bowl with extra feta. This is the second time this has happened. Can you please look into this?',
    timestamp: '2024-01-15 14:30',
    status: 'unread',
    priority: 'high',
    orderId: 'ORD-001',
    customerInfo: {
      email: 'sarah.j@email.com',
      phone: '+1 (555) 123-4567',
      totalOrders: 47,
      customerSince: '2023-08-15'
    }
  },
  {
    id: 2,
    sender: 'MealPlan Pro Support',
    senderType: 'admin',
    avatar: '/avatars/admin.png',
    initials: 'MP',
    subject: 'New Feature: Meal Plan Analytics Dashboard',
    preview: 'We\'ve added a new analytics dashboard to help you track...',
    content: 'We\'ve added a new analytics dashboard to help you track your meal plan performance. You can now see detailed metrics about subscriber retention, popular meals, and revenue trends. Check it out in the Analytics section!',
    timestamp: '2024-01-15 10:00',
    status: 'read',
    priority: 'medium',
    isSystemMessage: true
  },
  {
    id: 3,
    sender: 'Michael Chen',
    senderType: 'customer',
    avatar: '/avatars/02.png',
    initials: 'MC',
    subject: 'Compliments on the Grilled Salmon!',
    preview: 'Just wanted to say the salmon was absolutely perfect...',
    content: 'Just wanted to say the salmon was absolutely perfect! The seasoning was spot on and it arrived hot. My family loved it. Will definitely be ordering again soon. Keep up the great work!',
    timestamp: '2024-01-14 19:45',
    status: 'read',
    priority: 'low',
    orderId: 'ORD-002',
    customerInfo: {
      email: 'michael.c@email.com',
      phone: '+1 (555) 234-5678',
      totalOrders: 32,
      customerSince: '2023-09-22'
    }
  },
  {
    id: 4,
    sender: 'Emma Wilson',
    senderType: 'customer',
    avatar: '/avatars/03.png',
    initials: 'EW',
    subject: 'Delivery was 30 minutes late',
    preview: 'My order was supposed to arrive between 6-8pm but came at 8:30pm...',
    content: 'My order was supposed to arrive between 6-8pm but came at 8:30pm. I understand delays happen, but I had guests waiting. The food was still good quality though. Could you please ensure better timing in the future?',
    timestamp: '2024-01-14 15:20',
    status: 'replied',
    priority: 'medium',
    orderId: 'ORD-003',
    customerInfo: {
      email: 'emma.w@email.com',
      phone: '+1 (555) 345-6789',
      totalOrders: 28,
      customerSince: '2023-07-10'
    }
  },
  {
    id: 5,
    sender: 'MealPlan Pro Support',
    senderType: 'admin',
    avatar: '/avatars/admin.png',
    initials: 'MP',
    subject: 'Important: Payment Processing Update',
    preview: 'We\'re updating our payment processing system on January 20th...',
    content: 'We\'re updating our payment processing system on January 20th from 2-4 AM EST. During this time, new orders may experience slight delays. All existing subscriptions will continue normally. We apologize for any inconvenience.',
    timestamp: '2024-01-13 09:00',
    status: 'read',
    priority: 'high',
    isSystemMessage: true
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'unread':
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    case 'read':
      return <CheckCircle className="h-4 w-4 text-blue-500" />;
    case 'replied':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
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

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const [replyText, setReplyText] = useState('');

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || message.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const unreadCount = messages.filter(m => m.status === 'unread').length;
  const adminMessages = messages.filter(m => m.senderType === 'admin').length;
  const customerMessages = messages.filter(m => m.senderType === 'customer').length;

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Manage customer communications and support messages
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{messages.length}</div>
            <p className="text-xs text-muted-foreground">
              +3 from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Unread Messages</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Customer Messages</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{customerMessages}</div>
            <p className="text-xs text-muted-foreground">
              From customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Admin Messages</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{adminMessages}</div>
            <p className="text-xs text-muted-foreground">
              From support team
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Message List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredMessages.map((message) => (
              <Card 
                key={message.id} 
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedMessage.id === message.id ? 'ring-2 ring-primary' : ''
                } ${message.status === 'unread' ? 'border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/50' : ''}`}
                onClick={() => setSelectedMessage(message)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={message.avatar} alt={message.sender} />
                        <AvatarFallback>{message.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">{message.sender}</p>
                          {message.senderType === 'admin' && (
                            <Badge variant="outline" className="text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {getStatusIcon(message.status)}
                      <Badge variant={getPriorityColor(message.priority)} className="text-xs">
                        {message.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <h4 className="text-sm font-medium mb-1 line-clamp-1">{message.subject}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{message.preview}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedMessage.avatar} alt={selectedMessage.sender} />
                    <AvatarFallback>{selectedMessage.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{selectedMessage.sender}</h3>
                      {selectedMessage.senderType === 'admin' && (
                        <Badge variant="outline" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Admin Priority
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedMessage.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedMessage.status)}
                  <Badge variant={getPriorityColor(selectedMessage.priority)}>
                    {selectedMessage.priority} priority
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{selectedMessage.subject}</h4>
                  <p className="text-sm leading-relaxed">{selectedMessage.content}</p>
                </div>

                {selectedMessage.orderId && (
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">Related Order</p>
                    <p className="text-sm text-muted-foreground">Order ID: {selectedMessage.orderId}</p>
                  </div>
                )}

                {selectedMessage.customerInfo && (
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm font-medium mb-2">Customer Information</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {selectedMessage.customerInfo.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {selectedMessage.customerInfo.phone}
                      </div>
                      <div>Total Orders: {selectedMessage.customerInfo.totalOrders}</div>
                      <div>Customer Since: {selectedMessage.customerInfo.customerSince}</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Reply Section */}
          {selectedMessage.senderType === 'customer' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reply to Customer</CardTitle>
                <CardDescription>
                  Send a response to {selectedMessage.sender}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Add Template
                      </Button>
                      <Button variant="outline" size="sm">
                        Attach File
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">Save Draft</Button>
                      <Button>
                        <Send className="mr-2 h-4 w-4" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                <Button variant="outline" size="sm">Mark as Read</Button>
                <Button variant="outline" size="sm">Mark Important</Button>
                <Button variant="outline" size="sm">Forward</Button>
                <Button variant="outline" size="sm">Archive</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}