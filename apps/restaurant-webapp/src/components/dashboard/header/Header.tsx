
import { Bell} from 'lucide-react'
import { Button } from '@restaurant-webapp/components/ui/button'

import { ThemeToggle } from '@restaurant-webapp/components/shared/ThemeToggle'
import { Badge } from '@restaurant-webapp/components/ui/badge'
import { MobileNav } from '@restaurant-webapp/components/dashboard/layout/mobile-nav'

import { UserDropdown } from './UserDropdown'

export function Header() {

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Mobile View */}
        <div className="flex items-center gap-4 w-full md:hidden justify-between">
          <h1 className="text-lg font-semibold">Spicy Vendor</h1>
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
          <UserDropdown/>
        </div>
      </div>
    </header>
  )
}