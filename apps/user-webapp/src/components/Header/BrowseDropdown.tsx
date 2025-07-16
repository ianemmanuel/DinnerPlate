"use client"

import { Button } from '../ui/button'
import { ChevronDown, ChevronUp,Bell, Settings, User, UserCog, Send } from 'lucide-react'
import Link from 'next/link'

export default function BrowseDropdown({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <UserCog className="h-4 w-4" /> {/* Icon for Browse */}
          <span>My Account</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 transition-transform" />
          ) : (
            <ChevronDown className="h-4 w-4 transition-transform" />
          )}
        </div>
      </Button>
      {isOpen && (
        <div className="pl-6 flex flex-col gap-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/Profile" className="flex items-center gap-2">
              <User className="h-4 w-4" /> {/* Icon for Restaurants */}
              <span>Profile</span>
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/Settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> {/* Icon for Meals */}
              <span>Settings</span>
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> {/* Icon for Meal Plans */}
              <span>Notifications</span>
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/messages" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              <span>Messages</span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}