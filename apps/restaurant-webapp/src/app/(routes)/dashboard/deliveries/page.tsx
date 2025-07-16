'use client';

import { useState } from 'react';
import { Button } from '@restaurant-webapp/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card';
import { Input } from '@restaurant-webapp/components/ui/input';
import { Badge } from '@restaurant-webapp/components/ui/badge';
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
  MapPin, 
  Clock, 
  CheckCircle, 
  Truck,
  User,
  Phone,
  Navigation,
  Package,
  AlertCircle
} from 'lucide-react';

const deliveries = [
  {
    id: 'DEL-001',
    orderId: 'ORD-001',
    customer: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    address: '123 Oak Street, Downtown, NY 10001',
    driver: 'Mike Wilson',
    driverPhone: '+1 (555) 987-6543',
    status: 'In Transit',
    estimatedTime: '15 mins',
    actualTime: null,
    distance: '2.3 km',
    items: ['Mediterranean Bowl', 'Greek Salad'],
    total: 34.98,
    deliveryWindow: '18:00 - 20:00',
    notes: 'Ring doorbell twice',
  },
  {
    id: 'DEL-002',
    orderId: 'ORD-002',
    customer: 'Michael Chen',
    phone: '+1 (555) 234-5678',
    address: '456 Pine Avenue, Midtown, NY 10002',
    driver: 'Anna Davis',
    driverPhone: '+1 (555) 876-5432',
    status: 'Preparing',
    estimatedTime: '25 mins',
    actualTime: null,
    distance: '3.1 km',
    items: ['Grilled Salmon', 'Quinoa Bowl'],
    total: 42.98,
    deliveryWindow: '19:00 - 21:00',
    notes: 'Leave at front desk',
  },
  {
    id: 'DEL-003',
    orderId: 'ORD-003',
    customer: 'Emma Wilson',
    phone: '+1 (555) 345-6789',
    address: '789 Elm Drive, Uptown, NY 10003',
    driver: 'John Smith',
    driverPhone: '+1 (555) 765-4321',
    status: 'Delivered',
    estimatedTime: '8 mins',
    actualTime: '12 mins',
    distance: '1.8 km',
    items: ['Vegan Buddha Bowl', 'Lentil Soup'],
    total: 28.98,
    deliveryWindow: '12:00 - 14:00',
    notes: 'Apartment 4B',
  },
  {
    id: 'DEL-004',
    orderId: 'ORD-004',
    customer: 'James Rodriguez',
    phone: '+1 (555) 456-7890',
    address: '321 Maple Street, Southside, NY 10004',
    driver: 'Sarah Lee',
    driverPhone: '+1 (555) 654-3210',
    status: 'Failed',
    estimatedTime: '20 mins',
    actualTime: null,
    distance: '4.2 km',
    items: ['Chicken Teriyaki', 'Miso Soup'],
    total: 24.98,
    deliveryWindow: '13:00 - 15:00',
    notes: 'Customer not available',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Preparing':
      return 'secondary';
    case 'In Transit':
      return 'default';
    case 'Delivered':
      return 'default';
    case 'Failed':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Preparing':
      return <Package className="h-4 w-4" />;
    case 'In Transit':
      return <Truck className="h-4 w-4" />;
    case 'Delivered':
      return <CheckCircle className="h-4 w-4" />;
    case 'Failed':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

export default function DeliveriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = 
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || delivery.status.toLowerCase().replace(' ', '-') === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Deliveries</h1>
        <p className="text-muted-foreground">
          Monitor and manage all delivery operations
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Currently out for delivery
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Delivery Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28 min</div>
            <p className="text-xs text-muted-foreground">
              -2 min from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              +1.2% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Deliveries</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Search by delivery ID, customer, or driver..."
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
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="in-transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Deliveries</TabsTrigger>
          <TabsTrigger value="all">All Deliveries</TabsTrigger>
          <TabsTrigger value="failed">Failed Deliveries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {filteredDeliveries
              .filter(delivery => ['Preparing', 'In Transit'].includes(delivery.status))
              .map((delivery) => (
                <Card key={delivery.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{delivery.id}</CardTitle>
                        <CardDescription>Order: {delivery.orderId}</CardDescription>
                      </div>
                      <Badge variant={getStatusColor(delivery.status)} className="flex items-center gap-1">
                        {getStatusIcon(delivery.status)}
                        {delivery.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Customer
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="font-medium">{delivery.customer}</div>
                          <div className="text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {delivery.phone}
                          </div>
                          <div className="text-muted-foreground flex items-start gap-1">
                            <MapPin className="h-3 w-3 mt-0.5" />
                            <span>{delivery.address}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          Driver
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="font-medium">{delivery.driver}</div>
                          <div className="text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {delivery.driverPhone}
                          </div>
                          <div className="text-muted-foreground flex items-center gap-1">
                            <Navigation className="h-3 w-3" />
                            {delivery.distance}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Timing
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div>ETA: {delivery.estimatedTime}</div>
                          <div className="text-muted-foreground">
                            Window: {delivery.deliveryWindow}
                          </div>
                          {delivery.notes && (
                            <div className="text-muted-foreground">
                              Note: {delivery.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div>
                        <div className="text-sm text-muted-foreground">Order Total</div>
                        <div className="text-lg font-bold">${delivery.total}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MapPin className="mr-2 h-4 w-4" />
                          Track
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="mr-2 h-4 w-4" />
                          Contact
                        </Button>
                        <Button size="sm">Update Status</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Deliveries</CardTitle>
              <CardDescription>
                Complete delivery history and tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Delivery ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell className="font-medium">{delivery.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{delivery.customer}</div>
                          <div className="text-sm text-muted-foreground">{delivery.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{delivery.driver}</div>
                          <div className="text-sm text-muted-foreground">{delivery.driverPhone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(delivery.status)} className="flex items-center gap-1 w-fit">
                          {getStatusIcon(delivery.status)}
                          {delivery.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {delivery.status === 'Delivered' ? 
                          `${delivery.actualTime} (actual)` : 
                          delivery.estimatedTime
                        }
                      </TableCell>
                      <TableCell>{delivery.distance}</TableCell>
                      <TableCell>${delivery.total}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <MapPin className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failed" className="space-y-4">
          <div className="grid gap-4">
            {filteredDeliveries
              .filter(delivery => delivery.status === 'Failed')
              .map((delivery) => (
                <Card key={delivery.id} className="border-destructive/50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-destructive">{delivery.id}</CardTitle>
                        <CardDescription>Order: {delivery.orderId}</CardDescription>
                      </div>
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        Failed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2">Customer Details</h4>
                        <div className="space-y-1 text-sm">
                          <div className="font-medium">{delivery.customer}</div>
                          <div className="text-muted-foreground">{delivery.phone}</div>
                          <div className="text-muted-foreground">{delivery.address}</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Failure Reason</h4>
                        <div className="text-sm text-destructive">
                          {delivery.notes}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="text-lg font-bold">${delivery.total}</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm" variant="outline">
                          Contact Customer
                        </Button>
                        <Button size="sm">Retry Delivery</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}