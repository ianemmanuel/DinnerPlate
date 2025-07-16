'use client';

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignupStore } from '@restaurant-webapp/lib/store/signup-store'
import { Button } from '@restaurant-webapp/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@restaurant-webapp/components/ui/radio-group'
import { Label } from '@restaurant-webapp/components/ui/label'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormMessage 
} from '@restaurant-webapp/components/ui/form'
import { businessTypeSchema, BusinessTypeFormValues } from '@restaurant-webapp/lib/validators/signup-validators'
//import { motion } from 'framer-motion'
import { Store, ChefHat } from 'lucide-react'

interface BusinessTypeStepProps {
  onNext: () => void
}

export function BusinessTypeStep({ onNext }: BusinessTypeStepProps) {
  const { businessType, updateField } = useSignupStore()
  
  const form = useForm<BusinessTypeFormValues>({
    resolver: zodResolver(businessTypeSchema),
    defaultValues: {
      businessType: businessType || undefined,
    },
  })

  const onSubmit = (data: BusinessTypeFormValues) => {
    updateField('businessType', data.businessType);
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Choose Your Business Type
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem
                          value="restaurant"
                          id="restaurant"
                          className="peer sr-only"
                        />
                      </FormControl>
                      <Label
                        htmlFor="restaurant"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <Store className="mb-3 h-10 w-10 text-primary" />
                        <div className="space-y-2 text-center">
                          <h3 className="font-semibold">Restaurant</h3>
                          <p className="text-sm text-muted-foreground">
                            Traditional dining establishment with dine-in options
                          </p>
                        </div>
                      </Label>
                    </FormItem>
                    
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem
                          value="commercial_kitchen"
                          id="commercial_kitchen"
                          className="peer sr-only"
                        />
                      </FormControl>
                      <Label
                        htmlFor="commercial_kitchen"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <ChefHat className="mb-3 h-10 w-10 text-primary" />
                        <div className="space-y-2 text-center">
                          <h3 className="font-semibold">Commercial Kitchen</h3>
                          <p className="text-sm text-muted-foreground">
                            Cloud/virtual kitchen focused on delivery and takeout
                          </p>
                        </div>
                      </Label>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="w-full"
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}