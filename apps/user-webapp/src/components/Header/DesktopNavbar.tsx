
import Link from 'next/link'
import IconButton from './IconButton'
import LanguageDropdown from './LanguageDropdown'
import ThemeToggle from './ThemeToggle'
import UserDropdown from './UserDropdown'
import { ChefHat, Search, ShoppingBag } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@user-webapp/components/ui/navigation-menu'
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

export default  function DesktopNavbar() {

  const {getUser, isLoading} = useKindeBrowserClient()
  const user =  getUser()



  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="hidden lg:flex container h-16 items-center justify-between px-4">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <ChefHat className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold text-primary">Dinner Plate</span>
      </Link>

      {/* Navigation Links */}
      <NavigationMenu className="ml-6">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <Link href="/restaurants" className="block space-y-1 rounded-md p-3 hover:bg-accent">
                  <div className="text-sm font-medium">🍽️ Categories</div>
                  <p className="text-sm text-muted-foreground">Find meal and meal plan categories</p>
                </Link>
                <Link href="/meal-plans" className="block space-y-1 rounded-md p-3 hover:bg-accent">
                  <div className="text-sm font-medium">🤑 Deals</div>
                  <p className="text-sm text-muted-foreground">Browse to find the best deals</p>
                </Link>
                  <Link href="/meal-plans" className="block space-y-1 rounded-md p-3 hover:bg-accent">
                  <div className="text-sm font-medium">🎉 Festivals</div>
                  <p className="text-sm text-muted-foreground">Browse to find the best deals</p>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {['Meals', 'Meal plans', 'Restaurants'].map((label, index) => (
            <NavigationMenuItem key={index}>
              <Link href={`/${label.toLowerCase().replace(' ', '-')}`} passHref legacyBehavior>
                <NavigationMenuLink className="inline-flex h-10 items-center px-4 text-sm font-medium hover:bg-accent">
                  {label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="ml-6 flex w-full max-w-md">
        <Input
          type="search"
          placeholder="Search meals, restaurants...etc"
          className="rounded-l-md border border-primary"
        />
        <Button type="submit" className="rounded-r-md border border-primary border-l-0 bg-primary text-white">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {/* Actions */}
      <div className="flex items-center gap-3 ml-6">
        <IconButton href="/cart" icon={ShoppingBag} badge={11} />
        {isLoading? (
          <p>Loading...</p>
        ):user ? (
          <>
            <LanguageDropdown />
            <ThemeToggle />
            <UserDropdown/>
          </>
        ) : (
          <>
            <Button variant="default" size="sm" asChild>
              <LoginLink>Sign in</LoginLink>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <RegisterLink postLoginRedirectURL="/welcome">Sign up</RegisterLink>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}


