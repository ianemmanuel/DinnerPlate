'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChefHat, Search, ShoppingCart, Menu, Home, LogOut } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import IconButton from './IconButton'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose, SheetDescription } from '../ui/sheet'
import NavLinks from './NavLinks'
import BrowseDropdown from './BrowseDropdown'
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"

type MobileNavbarProps = {
  user: {
    given_name?: string | null;
    family_name?: string | null;
    email?: string | null;
    picture?: string | null;
  } | null
}

export default function MobileNavbar({ user }: MobileNavbarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isBrowseOpen, setIsBrowseOpen] = useState(false)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Search submitted:', searchQuery)
  }

  return (
    <>
      <div className="flex h-16 items-center justify-between px-4 lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-12 w-12 text-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Menu panel with navigation links and account options.
              </SheetDescription>
              <SheetClose asChild>
                <IconButton href="/cart" icon={ShoppingCart} badge={11} buttonVariant="ghost" />
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
                <NavLinks />

                {user ? (
                  <>
                    <BrowseDropdown isOpen={isBrowseOpen} setIsOpen={setIsBrowseOpen} />
                  </>
                ) : (
                  <div className="sticky bottom-0 bg-background pt-4 border-t">
                    <Button variant="default" className="w-full justify-center" asChild>
                      <LoginLink postLoginRedirectURL="/welcome">
                        Login
                      </LoginLink>
                    </Button>
                    <Button variant="outline" className="w-full justify-center" asChild>
                      <RegisterLink postLoginRedirectURL="/welcome">
                        Sign up
                      </RegisterLink>
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {user && (
              <div className="sticky bottom-0 bg-background pt-4 border-t">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <LogoutLink>
                    <div className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </div>
                  </LogoutLink>
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center space-x-2 mx-auto">
          <ChefHat className="h-8 w-8 text-primary" />
        </Link>

        <IconButton href="/cart" icon={ShoppingCart} badge={11} />
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-3 lg:hidden">
        <form onSubmit={handleSearchSubmit} className="flex w-full gap-2">
          <Input
            type="search"
            placeholder="Search meals, restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 rounded-md border border-primary"
          />
          <Button type="submit" size="icon" className="rounded-md bg-primary text-white">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  )
}
