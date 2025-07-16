'use client';

import { useState } from 'react';
import { Input } from '@restaurant-webapp/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@restaurant-webapp/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card'
import { Badge } from '@restaurant-webapp/components/ui/badge'
import { Button } from '@restaurant-webapp/components/ui/button'
import {
  Clock, Navigation, Phone, Route, User, MapPin, Zap,
} from 'lucide-react'

interface Delivery {
  id: string;
  driver: string;
  customer: string;
  address: string;
  phone: string;
  status: string;
  estimatedTime: string;
  distance: string;
  coordinates: { lat: number; lng: number };
  route: { lat: number; lng: number; time: string; status: string }[];
}

export function DeliveryTracking({ deliveries }: { deliveries: Delivery[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(deliveries[0]);

  const filtered = deliveries.filter((d) =>
    d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Sidebar list */}
      <div className="lg:col-span-1 space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search deliveries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="transit">In Transit</SelectItem>
              <SelectItem value="delivery">Out for Delivery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {filtered.map((delivery) => (
            <Card
              key={delivery.id}
              className={`cursor-pointer transition-colors ${
                selectedDelivery.id === delivery.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedDelivery(delivery)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-sm">{delivery.id}</CardTitle>
                    <CardDescription className="text-xs">{delivery.customer}</CardDescription>
                  </div>
                  <Badge
                    variant={
                      delivery.status === 'Out for Delivery'
                        ? 'default'
                        : delivery.status === 'In Transit'
                        ? 'secondary'
                        : 'outline'
                    }
                    className="text-xs"
                  >
                    {delivery.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><User className="h-3 w-3" />{delivery.driver}</div>
                <div className="flex items-center gap-1"><Clock className="h-3 w-3" />ETA: {delivery.estimatedTime}</div>
                <div className="flex items-center gap-1"><Navigation className="h-3 w-3" />{delivery.distance}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Map & Details */}
      <div className="lg:col-span-2 space-y-6">
        {/* Placeholder Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" />Live Map Tracking</CardTitle>
            <CardDescription>Real-time location of {selectedDelivery.driver}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
              <p className="text-sm text-muted-foreground">[Google Map would appear here]</p>
            </div>
          </CardContent>
        </Card>

        {/* Details & Route */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Delivery Details */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Delivery Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Customer</h4>
                <div className="text-sm text-muted-foreground">{selectedDelivery.customer}</div>
                <div className="text-sm text-muted-foreground flex gap-1"><Phone className="h-3 w-3" />{selectedDelivery.phone}</div>
                <div className="text-sm text-muted-foreground flex gap-1"><MapPin className="h-3 w-3" />{selectedDelivery.address}</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Driver</h4>
                <div className="text-sm text-muted-foreground">{selectedDelivery.driver}</div>
                <div className="text-sm text-muted-foreground flex gap-1"><Navigation className="h-3 w-3" />{selectedDelivery.distance}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1"><Phone className="h-4 w-4 mr-2" />Call Driver</Button>
                <Button size="sm" variant="outline" className="flex-1"><Phone className="h-4 w-4 mr-2" />Call Customer</Button>
              </div>
            </CardContent>
          </Card>

          {/* Route Progress */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Route className="h-5 w-5" />Route Progress</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {selectedDelivery.route.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-green-500' :
                    index === selectedDelivery.route.length - 1 ? 'bg-blue-500' : 'bg-orange-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span>{point.status}</span>
                      <span className="text-muted-foreground">{point.time}</span>
                    </div>
                    {index === 1 && <p className="text-xs text-muted-foreground mt-1">Current location</p>}
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="text-muted-foreground">
                    {selectedDelivery.status === 'Preparing' ? '0%' :
                     selectedDelivery.status === 'In Transit' ? '50%' :
                     selectedDelivery.status === 'Out for Delivery' ? '80%' : '100%'}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full mt-2">
                  <div className="h-2 bg-primary rounded-full transition-all"
                    style={{ width: selectedDelivery.status === 'Preparing' ? '0%' :
                                   selectedDelivery.status === 'In Transit' ? '50%' :
                                   selectedDelivery.status === 'Out for Delivery' ? '80%' : '100%' }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5" />Quick Actions</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline" size="sm">Update Status</Button>
              <Button variant="outline" size="sm">Send Message</Button>
              <Button variant="outline" size="sm">Report Issue</Button>
              <Button variant="outline" size="sm">Optimize Route</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
