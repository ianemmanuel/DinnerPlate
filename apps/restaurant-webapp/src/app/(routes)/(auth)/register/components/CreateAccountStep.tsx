'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignupStore } from '@restaurant-webapp/lib/store/signup-store'
import { Button } from '@restaurant-webapp/components/ui/button'
import { Input } from '@restaurant-webapp/components/ui/input'
import { Checkbox } from '@restaurant-webapp/components/ui/checkbox'
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@restaurant-webapp/components/ui/form'
import { 
  createAccountSchema, 
  CreateAccountFormValues 
} from '@restaurant-webapp/lib/validators/signup-validators'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { sendEmailOtp } from '@restaurant-webapp/lib/api/register'
import { toast } from 'sonner'

interface CreateAccountStepProps {
  onNext: () => void
  onBack: () => void
}

export function CreateAccountStep({ onNext, onBack }: CreateAccountStepProps) {
  const { 
    businessName, 
    businessEmail, 
    ownerFirstName, 
    ownerLastName, 
    password, 
    agreedToTerms, 
    updateField 
  } = useSignupStore();
  
  const [showPassword, setShowPassword] = useState(false)
  console.log('Manu')
  
  const form = useForm<CreateAccountFormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      businessName: businessName || '',
      businessEmail: businessEmail || '',
      ownerFirstName: ownerFirstName || '',
      ownerLastName: ownerLastName || '',
      password: password || '',
      agreedToTerms: agreedToTerms ?? false,
    },
  })

  const { mutate, isPending } = useMutation({
      mutationFn: async (data: CreateAccountFormValues) => {
        // First update the store with form data
        updateField('businessName', data.businessName);
        updateField('businessEmail', data.businessEmail);
        updateField('ownerFirstName', data.ownerFirstName);
        updateField('ownerLastName', data.ownerLastName);
        updateField('password', data.password);
        updateField('agreedToTerms', data.agreedToTerms);

        // Then send OTP to the email
        return sendEmailOtp(data.businessEmail);
      },
      onSuccess: () => {
        toast.success('OTP sent', {
          description: 'A verification code has been sent to your email.',
        })
        onNext()
      },
      onError: (error) => {
        toast.error('Failed to send OTP', {
          description: error.message || 'Please try again later.',
        })
      }
  })

  const onSubmit = (data: CreateAccountFormValues) => {
    mutate(data)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Create Your Account
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your business name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name that will be displayed to customers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="businessEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="email@example.com" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  We'll use this email for account verification and important updates.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ownerFirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="ownerLastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Create a secure password" 
                      {...field} 
                    />
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Must be at least 8 characters with uppercase, lowercase, number, and special character.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="agreedToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the{" "}
                    <a 
                      href="/terms-of-service.pdf" 
                      target="_blank" 
                      className="text-primary underline hover:text-primary/80"
                    >
                      Terms of Service
                    </a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
            >
              Back
            </Button>
            
            <Button type="submit">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}