'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignupStore } from '@restaurant-webapp/lib/store/signup-store'
import { Button } from '@restaurant-webapp/components/ui/button'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@restaurant-webapp/components/ui/form'
import { 
  phoneVerificationSchema, 
  PhoneVerificationFormValues 
} from '@restaurant-webapp/lib/validators/signup-validators'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@restaurant-webapp/components/ui/input-otp'
import { Alert, AlertDescription, AlertTitle } from '@restaurant-webapp/components/ui/alert'
import { AlertCircle, Phone, Loader2 } from 'lucide-react'

interface PhoneVerificationStepProps {
  onNext: () => void
  onBack: () => void
}

export function PhoneVerificationStep({ onNext, onBack }: PhoneVerificationStepProps) {
  const { businessPhone, phoneOtp, phoneVerified, updateField } = useSignupStore()
  const [countdown, setCountdown] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  
  const form = useForm<PhoneVerificationFormValues>({
    resolver: zodResolver(phoneVerificationSchema),
    defaultValues: {
      phoneOtp: phoneOtp || '',
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const onSubmit = async (data: PhoneVerificationFormValues) => {
    setIsVerifying(true)
    
    // In a real app, we would call the API to verify the OTP
    // For demonstration, we'll simulate an API call with a timeout
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, any 6-digit code is accepted
      updateField('phoneOtp', data.phoneOtp)
      updateField('phoneVerified', true)
      
      toast.success('Phone successfully verified', {
        description: 'Your phone number has been verified successfully.',
      });
      
      onNext();
    } catch (error) {
      toast.error('Verification failed', {
        description: 'The code you entered is invalid. Please try again.',
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendOtp = async () => {
    setIsResending(true)
    
    // In a real app, we would call the API to resend the OTP
    // For demonstration, we'll simulate an API call with a timeout
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setCountdown(60)
      toast.success('Code resent', {
        description: `A new verification code has been sent to ${businessPhone}.`,
      })
    } catch (error) {
      toast.error('Failed to resend code', {
        description: 'There was an error sending the verification code. Please try again.',
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Verify Your Phone
      </h2>
      
      <div className="flex items-center justify-center my-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Phone className="h-8 w-8 text-primary" />
        </div>
      </div>
      
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Check your phone</AlertTitle>
        <AlertDescription>
          We've sent a verification code to <strong>{businessPhone}</strong>. 
          Please enter it below to continue.
        </AlertDescription>
      </Alert>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="phoneOtp"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <InputOTP 
                    maxLength={6} 
                    value={field.value} 
                    onChange={field.onChange}
                    className="flex justify-center gap-2"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-sm text-muted-foreground">
                Resend code in {countdown} seconds
              </p>
            ) : (
              <Button
                type="button"
                variant="link"
                onClick={handleResendOtp}
                disabled={isResending}
                className="p-0 h-auto"
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Resend code'
                )}
              </Button>
            )}
          </div>
          
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
            >
              Back
            </Button>
            
            <Button 
              type="submit"
              disabled={isVerifying || form.getValues().phoneOtp.length !== 6}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Continue'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}