'use client';

import { useState } from 'react';
import { Button } from '@restaurant-webapp/components/ui/button';
import { Card, CardContent,CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card';
import { Input } from '@restaurant-webapp/components/ui/input';
import { Badge } from '@restaurant-webapp/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@restaurant-webapp/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@restaurant-webapp/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@restaurant-webapp/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@restaurant-webapp/components/ui/tabs';
import { 
  Users, 
  Star, 
  DollarSign, 
  Calendar,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Heart
} from 'lucide-react';

const customers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@restaurant-webappemail.com',
    phone: '+1 (555) 123-4567',
    address: '123 Oak Street, Downtown, NY 10001',
    avatar: '/avatars/01.png',
    initials: 'SJ',
    joinDate: '2023-08-15',
    totalOrders: 47,
    totalSpent: 1247.89,
    avgOrderValue: 26.55,
    lastOrder: '2024-01-15',
    status: 'Active',
    tier: 'Gold',
    favoriteItems: ['Mediterranean Bowl', 'Greek Salad'],
    subscriptions: ['Mediterranean Week'],
    rating: 4.8,
    notes: 'Prefers contactless delivery',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.c@restaurant-webappemail.com',
    phone: '+1 (555) 234-5678',
    address: '456 Pine Avenue, Midtown, NY 10002',
    avatar: '/avatars/02.png',
    initials: 'MC',
    joinDate: '2023-09-22',
    totalOrders: 32,
    totalSpent: 892.45,
    avgOrderValue: 27.89,
    lastOrder: '2024-01-14',
    status: 'Active',
    tier: 'Silver',
    favoriteItems: ['Grilled Salmon', 'Quinoa Bowl'],
    subscriptions: ['Healthy Protein Pack'],
    rating: 4.9,
    notes: 'Allergic to nuts',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    email: 'emma.w@restaurant-webappemail.com',
    phone: '+1 (555) 345-6789',
    address: '789 Elm Drive, Uptown, NY 10003',
    avatar: '/avatars/03.png',
    initials: 'EW',
    joinDate: '2023-07-10',
    totalOrders: 28,
    totalSpent: 654.32,
    avgOrderValue: 23.37,
    lastOrder: '2024-01-13',
    status: 'Active',
    tier: 'Silver',
    favoriteItems: ['Vegan Buddha Bowl', 'Lentil Soup'],
    subscriptions: ['Vegan Delight'],
    rating: 4.6,
    notes: 'Vegan diet only',
  },
  {
    id: 4,
    name: 'James Rodriguez',
    email: 'james.r@restaurant-webappemail.com',
    phone: '+1 (555) 456-7890',
    address: '321 Maple Street, Southside, NY 10004',
    avatar: '/avatars/04.png',
    initials: 'JR',
    joinDate: '2023-11-05',
    totalOrders: 15,
    totalSpent: 387.65,
    avgOrderValue: 25.84,
    lastOrder: '2024-01-10',
    status: 'Inactive',
    tier: 'Bronze',
    favoriteItems: ['Chicken Teriyaki', 'Miso Soup'],
    subscriptions: [],
    rating: 4.7,
    notes: 'Prefers spicy food',
  },
];

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'Gold':
      return 'default';
    case 'Silver':
      return 'secondary';
    case 'Bronze':
      return 'outline';
    default:
      return 'outline';
  }
};

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTier === 'all' || customer.tier.toLowerCase() === selectedTier;
    const matchesStatus = selectedStatus === 'all' || customer.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesTier && matchesStatus;
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Manage your customer relationships and insights
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Active Subscribers</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Avg Customer Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">$295.83</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Customer Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">
              +0.2 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <Input
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedTier} onValueChange={setSelectedTier}>
            <SelectTrigger className="w-full md:w-32">
              <SelectValue placeholder="Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
              <SelectItem value="bronze">Bronze</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="detailed" className="text-xs md:text-sm">Detailed View</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs md:text-sm">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                        <AvatarImage src={customer.avatar} alt={customer.name} />
                        <AvatarFallback>{customer.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base md:text-lg truncate">{customer.name}</CardTitle>
                        <CardDescription className="text-xs md:text-sm truncate">{customer.email}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={getTierColor(customer.tier)} className="text-xs flex-shrink-0">
                      {customer.tier}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs">Total Orders</div>
                        <div className="font-medium">{customer.totalOrders}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Total Spent</div>
                        <div className="font-medium">${customer.totalSpent}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Avg Order</div>
                        <div className="font-medium">${customer.avgOrderValue}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Rating</div>
                        <div className="font-medium flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          {customer.rating}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Favorite Items</div>
                      <div className="flex flex-wrap gap-1">
                        {customer.favoriteItems.map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {customer.subscriptions.length > 0 && (
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Active Subscriptions</div>
                        <div className="flex flex-wrap gap-1">
                          {customer.subscriptions.map((sub, index) => (
                            <Badge key={index} className="text-xs">
                              {sub}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs">
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-xs">
                        <MessageSquare className="mr-1 h-3 w-3" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Customer Details</CardTitle>
              <CardDescription>
                Comprehensive customer information and history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Customer</TableHead>
                      <TableHead className="min-w-[150px]">Contact</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Last Order</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage src={customer.avatar} alt={customer.name} />
                              <AvatarFallback>{customer.initials}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <div className="font-medium text-sm truncate">{customer.name}</div>
                              <div className="text-xs text-muted-foreground">
                                Joined {customer.joinDate}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-xs flex items-center gap-1">
                              <Mail className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{customer.email}</span>
                            </div>
                            <div className="text-xs flex items-center gap-1">
                              <Phone className="h-3 w-3 flex-shrink-0" />
                              <span>{customer.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getTierColor(customer.tier)} className="text-xs">
                            {customer.tier}
                          </Badge>
                        </TableCell>
                        <TableCell>{customer.totalOrders}</TableCell>
                        <TableCell>${customer.totalSpent}</TableCell>
                        <TableCell className="text-sm">{customer.lastOrder}</TableCell>
                        <TableCell>
                          <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MessageSquare className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Phone className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5" />
                  Customer Growth
                </CardTitle>
                <CardDescription>
                  New customer acquisition over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">This Month</span>
                    <span className="text-sm text-muted-foreground">+127 customers</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Month</span>
                    <span className="text-sm text-muted-foreground">+98 customers</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Growth Rate</span>
                    <span className="text-sm text-green-600">+29.6%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5" />
                  Customer Loyalty
                </CardTitle>
                <CardDescription>
                  Retention and loyalty metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Retention Rate</span>
                    <span className="text-sm text-muted-foreground">87.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Repeat Customers</span>
                    <span className="text-sm text-muted-foreground">73.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg Lifetime Value</span>
                    <span className="text-sm text-muted-foreground">$295.83</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Customer Tier Distribution</CardTitle>
                <CardDescription>
                  Breakdown of customers by loyalty tier
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-yellow-600">342</div>
                    <div className="text-sm text-muted-foreground">Gold Tier</div>
                    <div className="text-xs text-muted-foreground">12.0%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-gray-500">1,247</div>
                    <div className="text-sm text-muted-foreground">Silver Tier</div>
                    <div className="text-xs text-muted-foreground">43.8%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-orange-600">1,258</div>
                    <div className="text-sm text-muted-foreground">Bronze Tier</div>
                    <div className="text-xs text-muted-foreground">44.2%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}