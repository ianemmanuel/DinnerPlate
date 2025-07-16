

import { Metadata } from 'next';
import { DeliveryTracking } from '@restaurant-webapp/components/dashboard/tracking/DeliveryTracking'

// Mock delivery data (replace later with fetch from API/db if needed)
const deliveries = [
  {
    id: 'DEL-001',
    driver: 'Mike Wilson',
    customer: 'Sarah Johnson',
    address: '123 Oak Street, Downtown',
    phone: '+1 (555) 123-4567',
    status: 'In Transit',
    estimatedTime: '15 mins',
    distance: '2.3 km',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    route: [
      { lat: 40.7589, lng: -73.9851, time: '14:30', status: 'Restaurant' },
      { lat: 40.7505, lng: -73.9934, time: '14:45', status: 'En Route' },
      { lat: 40.7128, lng: -74.0060, time: '15:00', status: 'Destination' },
    ],
  },
  {
    id: 'DEL-002',
    driver: 'Anna Davis',
    customer: 'Michael Chen',
    address: '456 Pine Avenue, Midtown',
    phone: '+1 (555) 234-5678',
    status: 'Preparing',
    estimatedTime: '25 mins',
    distance: '3.1 km',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    route: [
      { lat: 40.7589, lng: -73.9851, time: '15:00', status: 'Restaurant' },
      { lat: 40.7614, lng: -73.9776, time: '15:15', status: 'En Route' },
      { lat: 40.7589, lng: -73.9851, time: '15:25', status: 'Destination' },
    ],
  },
  {
    id: 'DEL-003',
    driver: 'John Smith',
    customer: 'Emma Wilson',
    address: '789 Elm Drive, Uptown',
    phone: '+1 (555) 345-6789',
    status: 'Out for Delivery',
    estimatedTime: '8 mins',
    distance: '1.8 km',
    coordinates: { lat: 40.7831, lng: -73.9712 },
    route: [
      { lat: 40.7589, lng: -73.9851, time: '14:00', status: 'Restaurant' },
      { lat: 40.7710, lng: -73.9782, time: '14:10', status: 'En Route' },
      { lat: 40.7831, lng: -73.9712, time: '14:18', status: 'Destination' },
    ],
  },
]

export const revalidate = 60; // ISR every 60 seconds

export const metadata: Metadata = {
  title: 'Spicy | Delivery Tracking',
  description: 'Real-time tracking of all active deliveries',
}

export default function TrackingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Delivery Tracking</h1>
        <p className="text-muted-foreground">
          Real-time tracking of all active deliveries
        </p>
      </div>

      <DeliveryTracking deliveries={deliveries} />
    </div>
  );
}
