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
  emailVerificationSchema, 
  EmailVerificationFormValues 
} from '@restaurant-webapp/lib/validators/signup-validators'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@restaurant-webapp/components/ui/input-otp'
import { Alert, AlertDescription, AlertTitle } from '@restaurant-webapp/components/ui/alert'
import { AlertCircle, Mail, Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { verifyEmailOtp, sendEmailOtp } from '@restaurant-webapp/lib/api/register'

interface EmailVerificationStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function EmailVerificationStep({ onNext, onBack }: EmailVerificationStepProps) {
  const { businessEmail, emailOtp, updateField } = useSignupStore()
  const [countdown, setCountdown] = useState(60)
  const [isResending, setIsResending] = useState(false)
  
  const form = useForm<EmailVerificationFormValues>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      emailOtp: emailOtp || '',
    },
  })

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const verifyMutation = useMutation({
    mutationFn: (otp: string) => verifyEmailOtp(businessEmail, otp),
    onSuccess: () => {
      updateField('emailVerified', true);
      toast.success('Email verified', {
        description: 'Your email has been verified successfully.',
      })
      onNext();
    },
    onError: (error) => {
      toast.error('Verification failed', {
        description: error.message || 'The code you entered is invalid.',
      })
    }
  })

  const resendMutation = useMutation({
    mutationFn: () => sendEmailOtp(businessEmail),
    onSuccess: () => {
      setCountdown(60);
      toast.success('Code resent', {
        description: `A new verification code has been sent to ${businessEmail}.`,
      })
    },
    onError: (error) => {
      toast.error('Failed to resend code', {
        description: error.message || 'Please try again later.',
      })
    },
    onSettled: () => {
      setIsResending(false)
    }
  })

  const onSubmit = (data: EmailVerificationFormValues) => {
    updateField('emailOtp', data.emailOtp)
    verifyMutation.mutate(data.emailOtp)
  }

  const handleResendOtp = () => {
    setIsResending(true)
    resendMutation.mutate()
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Verify Your Email
      </h2>
      
      <div className="flex items-center justify-center my-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Mail className="h-8 w-8 text-primary" />
        </div>
      </div>
      
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Check your email</AlertTitle>
        <AlertDescription>
          We've sent a verification code to <strong>{businessEmail}</strong>. 
          Please enter it below to continue.
        </AlertDescription>
      </Alert>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="emailOtp"
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
              disabled={verifyMutation.isPending || form.getValues().emailOtp.length !== 6}
            >
              {verifyMutation.isPending ? (
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