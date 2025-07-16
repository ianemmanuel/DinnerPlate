'use client'

import { LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@restaurant-webapp/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@restaurant-webapp/components/ui/avatar'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@restaurant-webapp/lib/store/auth-store'
import { Skeleton } from '@restaurant-webapp/components/ui/skeleton'
import { Button } from '@restaurant-webapp/components/ui/button'
 
export function UserDropdown() {
  const router = useRouter()
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

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    )
  } 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={'/images/default-restaurant.png'}  
              alt={vendor?.businessName || 'Vendor'}
            />
            <AvatarFallback>
              {getInitials(vendor?.businessName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none truncate">
              {vendor?.businessName || 'Vendor'}
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {vendor?.businessEmail || ''}
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
  )
}