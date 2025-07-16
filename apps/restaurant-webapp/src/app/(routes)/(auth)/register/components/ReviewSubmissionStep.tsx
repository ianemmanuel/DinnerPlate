'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignupStore } from '@restaurant-webapp/lib/store/signup-store'
import { Button } from '@restaurant-webapp/components/ui/button'
import { Checkbox } from '@restaurant-webapp/components/ui/checkbox'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@restaurant-webapp/components/ui/form'
import { 
  reviewSubmissionSchema, 
  ReviewSubmissionFormValues 
} from '@restaurant-webapp/lib/validators/signup-validators'
import { toast } from 'sonner'
import { Card, CardContent } from '@restaurant-webapp/components/ui/card'
import { Separator } from '@restaurant-webapp/components/ui/separator'
import { Loader2, FileText, Info, CheckCircle2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { vendorRegistration } from '@restaurant-webapp/lib/api/register'

interface ReviewSubmissionStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function ReviewSubmissionStep({ onNext, onBack }: ReviewSubmissionStepProps) {
  const { 
    businessType,
    businessName,
    businessEmail,
    ownerFirstName,
    ownerLastName,
    legalBusinessName,
    businessPhone,
    country,
    city,
    street,
    postalCode,
    documents,
    confirmSubmission,
    updateField
  } = useSignupStore()

  const form = useForm<ReviewSubmissionFormValues>({
    resolver: zodResolver(reviewSubmissionSchema),
    defaultValues: {
      confirmSubmission: confirmSubmission || false,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ReviewSubmissionFormValues) => {
      const signupData = useSignupStore.getState()

      if (!signupData.businessType) {
        throw new Error('Business type is required')
      }

      const payload = {
        businessType: signupData.businessType,
        businessName: signupData.businessName,
        businessEmail: signupData.businessEmail,
        ownerFirstName: signupData.ownerFirstName,
        ownerLastName: signupData.ownerLastName,
        legalBusinessName: signupData.legalBusinessName,
        businessPhone: signupData.businessPhone,
        country: signupData.country,
        city: signupData.city,
        street: signupData.street,
        postalCode: signupData.postalCode,
        latitude: signupData.latitude,
        longitude: signupData.longitude,
        password: signupData.password,
        agreedToTerms: signupData.agreedToTerms,
        confirmSubmission: data.confirmSubmission,
      }

      const response = await vendorRegistration(payload)

      if (!response.success) {
        throw new Error(response.message || 'Registration failed')
      }

      return response
    },
    onSuccess: (result) => {
      updateField('confirmSubmission', true)
      updateField('status', 'pending')

      toast.success('Application submitted', {
        description: result.message || 'Your application has been submitted successfully.',
      })

      onNext()
    },
    onError: (error) => {
      toast.error('Submission failed', {
        description: error instanceof Error ? error.message : 'There was an error submitting your application.',
      })
    },
  })

  const onSubmit = (data: ReviewSubmissionFormValues) => {
    mutate(data)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Review & Submit
      </h2>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Business Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Business Type</div>
              <div className="text-sm font-medium">
                {businessType === 'restaurant' ? 'Restaurant' : 'Commercial Kitchen'}
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Business Name</div>
              <div className="text-sm font-medium">{businessName}</div>
            </div>
            
            {legalBusinessName && (
              <>
                <Separator />
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-muted-foreground">Legal Business Name</div>
                  <div className="text-sm font-medium">{legalBusinessName}</div>
                </div>
              </>
            )}
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Business Email</div>
              <div className="text-sm font-medium">{businessEmail}</div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Business Phone</div>
              <div className="text-sm font-medium">{businessPhone}</div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Owner Name</div>
              <div className="text-sm font-medium">{ownerFirstName} {ownerLastName}</div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Business Address</div>
              <div className="text-sm font-medium">
                {street}, {city}, {postalCode}, {country}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Uploaded Documents</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-sm font-medium">Business License</span>
              </div>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-sm font-medium">Health Certificate</span>
              </div>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            
            {documents.nationalId && (
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">National ID / Passport</span>
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-muted/50 rounded-md p-4 mb-6 flex">
        <Info className="h-5 w-5 mr-3 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium mb-1">What happens next?</p>
          <p className="text-sm text-muted-foreground">
            After submission, our team will review your application and documents. 
            This typically takes 1-3 business days. You'll receive an email notification 
            once the review is complete.
          </p>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="confirmSubmission"
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
                    I confirm that all submitted information is correct and complete.
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
                  Submitting...
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
