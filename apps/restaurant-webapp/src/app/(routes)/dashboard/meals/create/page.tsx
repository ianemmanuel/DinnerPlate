'use client'

import { Button } from "@restaurant-webapp/components/ui/button"
import { ArrowLeft, Eye } from "lucide-react"
import Link from "next/link"
import { CreateMealForm } from "@restaurant-webapp/components/meals/create/CreateMealForm"
import { useRouter } from 'next/navigation'

export default function CreateMealPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/meals">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Meals
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Create New Meal</h1>
                <p className="text-muted-foreground">Add a new meal to your menu</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <CreateMealForm onSuccess={() => router.push('/meals')} />
      </div>
    </div>
  )
}