import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@restaurant-webapp/components/ui/card'
import { ThemeToggle } from '@restaurant-webapp/components/shared/ThemeToggle'
import { ChefHat, Utensils } from 'lucide-react'
import LoginForm from '@restaurant-webapp/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Logo and Branding */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="relative">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <ChefHat className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center border-2 border-background">
                <Utensils className="h-3 w-3 text-accent-foreground" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">MealPlan Pro</h1>
            <p className="text-muted-foreground">
              Welcome back to your restaurant dashboard
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/20">
              <p className="text-xs text-muted-foreground text-center mb-2 font-medium">
                Demo Credentials
              </p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><span className="font-medium">Email:</span> demo@example.com</p>
                <p><span className="font-medium">Password:</span> demo123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}