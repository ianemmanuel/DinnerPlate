import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@restaurant-webapp/components/ui/button'
import { ChevronRight, UserPlus, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dashboard - Restaurant & Kitchen Dashboard',
  description: 'Manage your restaurant or commercial kitchen',
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 flex flex-col">
      <header className="py-6 px-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FoodConnect</h1>
          <nav>
            <Link href="/dashboard/signup">
              <Button variant="outline" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Connect with hungry customers
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 md:mb-12">
            Start managing your restaurant or commercial kitchen on our platform. 
            Expand your reach and grow your business.
          </p>
          <Link href="/dashboard/signup">
            <Button size="lg" className="px-8">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
      
      <footer className="py-6 px-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} FoodConnect. All rights reserved.
        </div>
      </footer>
    </div>
  )
}