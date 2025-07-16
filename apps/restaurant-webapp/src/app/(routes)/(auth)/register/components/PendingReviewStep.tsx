"use client"

import { useSignupStore } from '@restaurant-webapp/lib/store/signup-store'
import { Button } from '@restaurant-webapp/components/ui/button'
import { Card, CardContent } from '@restaurant-webapp/components/ui/card'
import { Separator } from '@restaurant-webapp/components/ui/separator'
import { 
  ClipboardCheck,  
  Clock, 
  MailOpen, 
  Phone,
  ChevronRight
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@restaurant-webapp/lib/store/auth-store'
import { toast } from 'sonner'
import { useState } from 'react'

export function PendingReviewStep() {
  const { businessName, businessEmail, businessPhone, password } = useSignupStore()
  const resetForm = useSignupStore((state) => state.resetForm)

  const router = useRouter()
  const { login } = useAuth()

  const [loading, setLoading] = useState(false)

  const handleLoginAndRedirect = async () => {
    try {
      setLoading(true)

      const loginResult = await login(businessEmail, password)

      if (!loginResult.success) {
        throw new Error(loginResult.error || 'Login failed after registration')
      }

      toast.success('Logged in successfully', {
        description: 'Welcome! Your application is under review.',
      })

      resetForm()
      localStorage.removeItem('kitchen-signup-storage')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Login failed', {
        description: error instanceof Error ? error.message : 'Unexpected error during login.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoHome = () => {
    resetForm()
    localStorage.removeItem('kitchen-signup-storage')
    router.push('/')
  }

  return (
    <div>
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <ClipboardCheck className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Application Submitted!
        </h2>
        <p className="text-muted-foreground max-w-md">
          Thank you for submitting your application. Our team will review your information and documents shortly.
        </p>
      </div>
      
      <Card className="mb-8 overflow-hidden">
        <div className="bg-primary/10 p-4 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-primary" />
          <h3 className="font-medium">Application Status: <span className="text-amber-600">Pending Review</span></h3>
        </div>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-6">
            Your application for <span className="font-medium text-foreground">{businessName}</span> is currently under review. 
            This process typically takes 1-3 business days. We'll notify you once the review is complete.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <MailOpen className="h-5 w-5 mr-3 text-muted-foreground" />
              <span className="text-sm">{businessEmail}</span>
            </div>
            
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
              <span className="text-sm">{businessPhone}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium text-lg mb-4">What happens next?</h3>
          
          <div className="space-y-6">
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4 shrink-0">
                <span className="text-sm font-medium text-primary">1</span>
              </div>
              <div>
                <p className="font-medium mb-1">Application Review</p>
                <p className="text-sm text-muted-foreground">
                  Our team reviews your business details and documents to ensure they meet our platform standards.
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4 shrink-0">
                <span className="text-sm font-medium text-primary">2</span>
              </div>
              <div>
                <p className="font-medium mb-1">Decision Notification</p>
                <p className="text-sm text-muted-foreground">
                  You'll receive an email notification with the approval decision. If approved, you can proceed to the next steps.
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4 shrink-0">
                <span className="text-sm font-medium text-primary">3</span>
              </div>
              <div>
                <p className="font-medium mb-1">Complete Your Profile</p>
                <p className="text-sm text-muted-foreground">
                  Once approved, you'll be able to add your branch information, upload your menu, and customize your profile.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col gap-3">
            <Button className="w-full" onClick={handleLoginAndRedirect} disabled={loading}>
              {loading ? "Logging in..." : "Go to Dashboard"}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" className="w-full" onClick={handleGoHome}>
              Return to Homepage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
