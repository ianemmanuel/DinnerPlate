
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card'
import { Alert, AlertDescription } from '@restaurant-webapp/components/ui/alert';
import { 
  Store, 
  CreditCard, 
  ArrowRight,
  Info
} from 'lucide-react'

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Welcome to Restaurant Hub 🍽️
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Let's get your kitchen set up! Complete these essential steps to start receiving orders and managing your business.
          </p>
        </div>

        {/* Important Notice */}
        <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <strong>Important:</strong> These steps are essential before accessing your dashboard and cannot be skipped. 
            Complete both to unlock all platform features.
          </AlertDescription>
        </Alert>

        {/* Onboarding Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Creation Card */}
          <Link href="profile/create" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/50 cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Store className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl flex items-center justify-center gap-2">
                  Create Your Kitchen Profile 👨‍🍳
                </CardTitle>
                <CardDescription className="text-base">
                  Set up your restaurant or virtual kitchen profile that customers will see
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Add your kitchen name and description</p>
                  <p>• Upload photos and set your cuisine type</p>
                  <p>• Configure operating hours and delivery zones</p>
                  <p>• Make your kitchen discoverable to customers</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Bank Account Setup Card */}
          <Link href="payout-settings" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/50 cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl flex items-center justify-center gap-2">
                  Link Your Bank Account 💳
                </CardTitle>
                <CardDescription className="text-base">
                  Connect your bank account to receive payments from orders
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Secure bank account verification</p>
                  <p>• Automatic weekly payouts</p>
                  <p>• Fast 1-2 business day processing</p>
                  <p>• Bank-level security and encryption</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  <span>Link Account</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Progress Indicator */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="text-sm text-muted-foreground">Profile Setup</span>
            </div>
            <div className="w-8 h-px bg-border"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm text-muted-foreground">Bank Account</span>
            </div>
            <div className="w-8 h-px bg-border"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                ✓
              </div>
              <span className="text-sm text-muted-foreground">Dashboard Access</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Complete both steps to unlock your full dashboard experience
          </p>
        </div>
      </div>
    </div>
  );
}