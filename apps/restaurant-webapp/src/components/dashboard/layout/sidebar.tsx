'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@restaurant-webapp/lib/utils';
import { Button } from '@restaurant-webapp/components/ui/button';
import { ScrollArea } from '@restaurant-webapp/components/ui/scroll-area';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Calendar,
  ShoppingCart,
  Truck,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Bell,
  MapPin,
  Star,
  Package,
  CreditCard,
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Meals',
    href: '/dashboard/meals',
    icon: UtensilsCrossed,
  },
  {
    name: 'Meal Plans',
    href: '/dashboard/meal-plans',
    icon: Calendar,
  },
  {
    name: 'Orders',
    href: '/dashboard/orders',
    icon: ShoppingCart,
  },
  {
    name: 'Deliveries',
    href: '/dashboard/deliveries',
    icon: Truck,
  },
  {
    name: 'Delivery Tracking',
    href: '/dashboard/tracking',
    icon: MapPin,
  },
  {
    name: 'Customers',
    href: '/dashboard/customers',
    icon: Users,
  },
  {
    name: 'Reviews',
    href: '/dashboard/reviews',
    icon: Star,
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    name: 'Inventory',
    href: '/dashboard/inventory',
    icon: Package,
  },
  {
    name: 'Payments',
    href: '/dashboard/payments',
    icon: CreditCard,
  },
  {
    name: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn('pb-12 min-h-screen', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight">Dinner Plate</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                    className="w-full justify-start mb-1"
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
