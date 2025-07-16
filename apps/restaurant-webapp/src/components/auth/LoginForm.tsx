'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@restaurant-webapp/components/ui/button'
import { Input } from '@restaurant-webapp/components/ui/input'
import { Label } from '@restaurant-webapp/components/ui/label'
import { Checkbox } from '@restaurant-webapp/components/ui/checkbox'
import { Alert, AlertDescription } from '@restaurant-webapp/components/ui/alert'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { useAuthStore } from '@restaurant-webapp/lib/store/auth-store'

export default function LoginForm() {
  const router = useRouter()
  const { login, isLoading: authLoading } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  console.log('manui')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    
    try {
      const { success, error } = await login(formData.email, formData.password)
       
      if (success) {
        router.push('/dashboard')
      } else {
        setError(error || 'Login failed. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  const isLoading = authLoading || isSubmitting

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="animate-in slide-in-from-top-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="restaurant@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="pl-10 h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            disabled={isLoading}
            required
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="pl-10 pr-10 h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            disabled={isLoading}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-10 w-10 p-0 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={formData.rememberMe}
            onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
            disabled={isLoading}
          />
          <Label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </Label>
        </div>
        <a
          href="/auth/forgot-password"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
          tabIndex={isLoading ? -1 : 0}
        >
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 text-base font-medium transition-all duration-200 hover:shadow-lg"
        disabled={isLoading}
      > 
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </Button>
    </form>
  );
}