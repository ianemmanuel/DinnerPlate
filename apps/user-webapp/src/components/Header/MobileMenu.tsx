"use client"

import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '../ui/sheet'
import {
  Menu,
  Home,
  LogOut,
  ShoppingCart,
} from 'lucide-react'
import NavLinks from './NavLinks'
import BrowseDropdown from './BrowseDropdown'
import { Button } from '../ui/button'
import Link from 'next/link'
import IconButton from './IconButton'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isBrowseOpen, setIsBrowseOpen] = useState(false)

  // Simulate user login state
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-12 w-12 text-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] flex flex-col"
      >
        <div className="flex justify-between items-center mb-6">
          <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
          <SheetClose asChild>
            <IconButton 
              href="/cart" 
              icon={ShoppingCart} 
              badge={11} 
              buttonVariant="ghost"
            />
          </SheetClose>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>

            {user ? (
              <>
                <NavLinks />
                <BrowseDropdown isOpen={isBrowseOpen} setIsOpen={setIsBrowseOpen} />
              </>
            ) : (
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/login" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Sticky Logout Button */}
        {user && (
          <div className="sticky bottom-0 bg-background pt-4 border-t">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/logout" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </Link>
            </Button>
          </div>
        )}
        
      </SheetContent>
    </Sheet>
  )
}