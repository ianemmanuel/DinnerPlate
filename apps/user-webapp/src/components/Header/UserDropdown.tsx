// UserDropdown.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Settings, LogOut, User, Bell} from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"

type UserDropdownProps = {
  user: {
    given_name?: string | null
    family_name?: string | null
    email?: string | null
    picture?: string | null
  } | null
}


export default function UserDropdown({ user }: UserDropdownProps) {
  const fullName = user?.given_name ? `${user.given_name} ${user.family_name ?? ''}`.trim() : 'User'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.picture ?? ""} alt={fullName} />
            <AvatarFallback>{user?.given_name?.[0] ?? 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {fullName}
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate max-w-[200px]">
              {user?.email ?? 'No email'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/notifications" className="w-full flex items-center">
            <div className="relative mr-2">
              <Bell className="h-4 w-4" />
              {11 > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              )}
            </div>
            <span>Notifications</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
        >
          <div className="flex items-center w-full">
            <LogOut className="mr-2 h-4 w-4" />
            <LogoutLink className="flex-1">Log out</LogoutLink>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
