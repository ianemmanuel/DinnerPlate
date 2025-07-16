'use client';

import { Card } from '@restaurant-webapp/components/ui/card';
import { Badge } from '@restaurant-webapp/components/ui/badge';
import { MapPin, Clock, User } from 'lucide-react';

const activeDeliveries = [
  {
    id: 'DEL001',
    customer: 'Sarah Johnson',
    address: '123 Oak Street, Downtown',
    status: 'In Transit',
    estimatedTime: '15 mins',
    driver: 'Mike Wilson',
    coordinates: { lat: 40.7128, lng: -74.0060 },
  },
  {
    id: 'DEL002',
    customer: 'Michael Chen',
    address: '456 Pine Avenue, Midtown',
    status: 'Preparing',
    estimatedTime: '25 mins',
    driver: 'Anna Davis',
    coordinates: { lat: 40.7589, lng: -73.9851 },
  },
  {
    id: 'DEL003',
    customer: 'Emma Wilson',
    address: '789 Elm Drive, Uptown',
    status: 'Out for Delivery',
    estimatedTime: '8 mins',
    driver: 'John Smith',
    coordinates: { lat: 40.7831, lng: -73.9712 },
  },
];

export function DeliveryMap() {
  return (
    <div className="space-y-4">
      {/* Placeholder for actual map integration */}
      <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Interactive Map View
          </p>
          <p className="text-xs text-muted-foreground">
            Google Maps integration would be implemented here
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Active Deliveries</h4>
        {activeDeliveries.map((delivery) => (
          <Card key={delivery.id} className="p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{delivery.customer}</span>
                  <Badge 
                    variant={
                      delivery.status === 'Out for Delivery' ? 'default' :
                      delivery.status === 'In Transit' ? 'secondary' : 'outline'
                    }
                    className="text-xs"
                  >
                    {delivery.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {delivery.address}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Driver: {delivery.driver}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {delivery.estimatedTime}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}