'use client';

import { useState } from 'react';
import { Button } from '@restaurant-webapp/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card'
import { Input } from '@restaurant-webapp/components/ui/input'
import { Badge } from '@restaurant-webapp/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@restaurant-webapp/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@restaurant-webapp/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@restaurant-webapp/components/ui/tabs'
import { 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Truck,
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp
} from 'lucide-react';

const orders = [
  {
    id: 'ORD-001',
    customer: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    items: ['Mediterranean Bowl', 'Greek Salad'],
    total: 34.98,
    status: 'Preparing',
    type: 'One-time',
    orderDate: '2024-01-15 14:30',
    deliveryTime: '18:00 - 20:00',
    address: '123 Oak Street, Downtown',
  },
  {
    id: 'ORD-002',
    customer: 'Michael Chen',
    email: 'michael.c@email.com',
    items: ['Grilled Salmon', 'Quinoa Bowl'],
    total: 42.98,
    status: 'Out for Delivery',
    type: 'Meal Plan',
    orderDate: '2024-01-15 12:15',
    deliveryTime: '19:00 - 21:00',
    address: '456 Pine Avenue, Midtown',
  },
  {
    id: 'ORD-003',
    customer: 'Emma Wilson',
    email: 'emma.w@email.com',
    items: ['Vegan Buddha Bowl', 'Lentil Soup'],
    total: 28.98,
    status: 'Delivered',
    type: 'One-time',
    orderDate: '2024-01-15 10:45',
    deliveryTime: '12:00 - 14:00',
    address: '789 Elm Drive, Uptown',
  },
  {
    id: 'ORD-004',
    customer: 'James Rodriguez',
    email: 'james.r@email.com',
    items: ['Chicken Teriyaki', 'Miso Soup'],
    total: 24.98,
    status: 'Cancelled',
    type: 'One-time',
    orderDate: '2024-01-15 09:20',
    deliveryTime: '13:00 - 15:00',
    address: '321 Maple Street, Southside',
  },
  {
    id: 'ORD-005',
    customer: 'Lisa Thompson',
    email: 'lisa.t@email.com',
    items: ['Mediterranean Week Plan'],
    total: 89.99,
    status: 'Confirmed',
    type: 'Meal Plan',
    orderDate: '2024-01-15 08:00',
    deliveryTime: '17:00 - 19:00',
    address: '654 Cedar Lane, Westside',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return 'default';
    case 'Preparing':
      return 'secondary';
    case 'Out for Delivery':
      return 'default';
    case 'Delivered':
      return 'default';
    case 'Cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return <CheckCircle className="h-4 w-4" />;
    case 'Preparing':
      return <Clock className="h-4 w-4" />;
    case 'Out for Delivery':
      return <Truck className="h-4 w-4" />;
    case 'Delivered':
      return <CheckCircle className="h-4 w-4" />;
    case 'Cancelled':
      return <XCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status.toLowerCase().replace(' ', '-') === selectedStatus;
    const matchesType = selectedType === 'all' || order.type.toLowerCase().replace(' ', '-') === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track all customer orders
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Awaiting preparation
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,247</div>
            <p className="text-xs text-muted-foreground">
              +8% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$32.45</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Search orders by ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="one-time">One-time</SelectItem>
            <SelectItem value="meal-plan">Meal Plan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>
                Complete list of all customer orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Delivery Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customer}</div>
                          <div className="text-sm text-muted-foreground">{order.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="text-sm">{item}</div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.type}</Badge>
                      </TableCell>
                      <TableCell>${order.total}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1 w-fit">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{order.deliveryTime}</div>
                          <div className="text-muted-foreground">{order.orderDate.split(' ')[0]}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {filteredOrders
              .filter(order => ['Confirmed', 'Preparing'].includes(order.status))
              .map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <CardDescription>{order.customer}</CardDescription>
                      </div>
                      <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2">Order Details</h4>
                        <div className="space-y-1 text-sm">
                          {order.items.map((item, index) => (
                            <div key={index}>{item}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Delivery Info</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div>{order.deliveryTime}</div>
                          <div>{order.address}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-lg font-bold">${order.total}</div>
                      <div className="flex gap-2">
                        <Button size="sm">Update Status</Button>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {filteredOrders
              .filter(order => order.status === 'Out for Delivery')
              .map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <CardDescription>{order.customer}</CardDescription>
                      </div>
                      <Badge variant="default" className="flex items-center gap-1">
                        <Truck className="h-4 w-4" />
                        Out for Delivery
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2">Order Details</h4>
                        <div className="space-y-1 text-sm">
                          {order.items.map((item, index) => (
                            <div key={index}>{item}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Delivery Info</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div>{order.deliveryTime}</div>
                          <div>{order.address}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-lg font-bold">${order.total}</div>
                      <div className="flex gap-2">
                        <Button size="sm">Track Delivery</Button>
                        <Button variant="outline" size="sm">
                          Contact Customer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Orders</CardTitle>
              <CardDescription>
                Successfully delivered orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Delivered At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders
                    .filter(order => order.status === 'Delivered')
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.customer}</div>
                            <div className="text-sm text-muted-foreground">{order.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {order.items.map((item, index) => (
                              <div key={index} className="text-sm">{item}</div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>${order.total}</TableCell>
                        <TableCell>{order.orderDate}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}