'use client'

import { Bell, LogOut } from 'lucide-react'
import { Button } from '@restaurant-webapp/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@restaurant-webapp/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@restaurant-webapp/components/ui/avatar'
import { ThemeToggle } from '@restaurant-webapp/components/shared/ThemeToggle'
import { Badge } from '@restaurant-webapp/components/ui/badge'
import { MobileNav } from '@restaurant-webapp/components/dashboard/layout/mobile-nav'
import { useAuthStore } from '@restaurant-webapp/lib/store/auth-store'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@restaurant-webapp/components/ui/skeleton'

export function Header() {
  const router = useRouter();
  const { vendor, logout, isLoading } = useAuthStore()

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login')
  }

  const getInitials = (name?: string) => {
    if (!name) return 'VP';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Mobile View */}
        <div className="flex items-center gap-4 w-full md:hidden justify-between">
          <h1 className="text-lg font-semibold">MealPlan Pro</h1>
          <MobileNav />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
              3
            </Badge>
          </Button>
          
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ) : vendor ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={'/images/default-restaurant.png'} 
                      alt={vendor.businessName} 
                    />
                    <AvatarFallback>
                      {getInitials(vendor.businessName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none truncate">
                      {vendor.businessName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {vendor.businessEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/support')}>
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push('/auth/login')}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}