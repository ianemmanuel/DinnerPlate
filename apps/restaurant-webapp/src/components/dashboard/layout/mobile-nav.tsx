'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@restaurant-webapp/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@restaurant-webapp/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@restaurant-webapp/components/ui/avatar';
import { Badge } from '@restaurant-webapp/components/ui/badge';
import { Separator } from '@restaurant-webapp/components/ui/separator';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

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
  Menu,
  LogOut,
  User,
  HelpCircle,
} from 'lucide-react';
import { useAuthStore } from '@restaurant-webapp/lib/store/auth-store';
import { Skeleton } from '@restaurant-webapp/components/ui/skeleton';

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
];

const accountItems = [
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: User,
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
  {
    name: 'Support',
    href: '/dashboard/support',
    icon: HelpCircle,
  },
];

export function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { vendor, logout, isLoading } = useAuthStore()

   const handleLogout = async () => {
      await logout()
      router.push('/login')
  }
  const getInitials = (name?: string | null) => {
    if (!name) return 'VP'
      return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Dinner Plate</SheetTitle>
          </SheetHeader>
        </VisuallyHidden>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            {isLoading ? (
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-5 w-10 rounded-full" />
              </div>
            ): (
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={'/images/default-restaurant.png'}  
                    alt={vendor?.businessName || 'Vendor'}
                  />
                  <AvatarFallback>{getInitials(vendor?.businessName)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{vendor?.businessName || 'Vendor'}</h3>
                  <p className="text-sm text-muted-foreground">{vendor?.type || 'Vendor'}</p>
                </div>
                <Badge className="text-xs">Pro</Badge>
              </div>
            )}

          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-3 space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground px-3 mb-2">
                Main Menu
              </h4>
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setOpen(false)}>
                  <Button
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="px-3 space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground px-3 mb-2">
                Account
              </h4>
              {accountItems.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setOpen(false)}>
                  <Button
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                    {item.name === 'Notifications' && (
                      <Badge className="ml-auto h-5 w-5 rounded-full p-0 text-xs">
                        3
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}