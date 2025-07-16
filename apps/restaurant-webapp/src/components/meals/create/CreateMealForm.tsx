// components/meals/create/CreateMealForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { mealFormSchema, type MealFormData } from '@restaurant-webapp/lib/validators/meal-validators'
import { useAuthStore } from '@restaurant-webapp/lib/store/auth-store'
import { Form } from '@restaurant-webapp/components/ui/form'
import { BasicInformationSection } from '@restaurant-webapp/components/meals/create/BasicInformationSection'
import { ImageUploadSection } from '@restaurant-webapp/components/meals/create/ImageUploadSection'
import { PricingSection } from '@restaurant-webapp/components/meals/create/PricingSection'
import { VariantsSection } from '@restaurant-webapp/components/meals/create/VariantsSection'
import { DietarySection } from '@restaurant-webapp/components/meals/create/DietarySection'
import { AvailabilitySection } from '@restaurant-webapp/components/meals/create/AvailabilitySection'
import { PromotionsSection } from '@restaurant-webapp/components/meals/create/PromotionsSection'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@restaurant-webapp/components/ui/button'
import { Save } from 'lucide-react'
import { useEffect } from 'react'

interface MealFormProps {
  onSuccess?: () => void
}

export function CreateMealForm({ onSuccess }: MealFormProps) {
  const { authFetch } = useAuthStore()
  const router = useRouter()

  const form = useForm<MealFormData>({
    resolver: zodResolver(mealFormSchema) as any,
    defaultValues: {
      name: "",
      category: "",
      price: "",
      description: "",
      images: {
        main: null,
        gallery: [],
      },
      variants: [],
      addOns: [],
      dietaryTags: [],
      allergens: [],
      promotions: [],
      availability: {
        type: "always",
        schedule: {},
        isActive: true,
      },
      preparationTime: 30,
      customPreparationTime: false,
      isPopular: false,
      isRecommended: false,
      nutritionInfo: {
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        fiber: "",
      },
    },
  })

  // Load draft if exists
  useEffect(() => {
    const draft = localStorage.getItem('meal-draft')
    if (draft) {
      try {
        form.reset(JSON.parse(draft))
        toast.info('Loaded unsaved draft', {
          action: {
            label: 'Clear',
            onClick: () => {
              localStorage.removeItem('meal-draft')
              form.reset()
              toast.success('Draft cleared')
            }
          }
        })
      } catch (e) {
        console.error('Failed to parse draft', e)
      }
    }
  }, [form])

  const mutation = useMutation({
    mutationFn: async (data: MealFormData) => {
      try {
        const formData = new FormData()
        
        // Append all non-file fields
        Object.keys(data).forEach(key => {
          if (key !== 'images') {
            const value = data[key as keyof MealFormData]
            formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value))
          }
        })

        // Handle image uploads
        if (data.images.main) {
          formData.append('mainImage', data.images.main)
        }
        if (data.images.gallery?.length > 0) {
          data.images.gallery.forEach((file) => {
            if (file) formData.append(`galleryImages`, file)
          })
        }
        const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URI}/api/meals`.replace(/([^:]\/)\/+/g, '$1')
        const response = await authFetch(endpoint, {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          let errorMessage = 'Failed to create meal'
          try {
            const errorData = await response.text()
            if (errorData) {
              try {
                const parsedError = JSON.parse(errorData)
                errorMessage = parsedError.message || errorData
              } catch {
                errorMessage = errorData
              }
            }
          } catch (e) {
            console.error('Error parsing error response:', e)
          }
          throw new Error(errorMessage)
        }

        localStorage.removeItem('meal-draft')
        return await response.json()
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An unknown error occurred')
      }
    },
    onSuccess: () => {
      toast.success('Meal created successfully!')
      onSuccess?.() || router.push('/meals')
    },
    onError: (error: Error) => {
      console.error('Submission error:', error)
      toast.error('Failed to save meal', {
        description: error.message,
        action: {
          label: 'Retry',
          onClick: () => mutation.mutate(form.getValues())
        },
        duration: 10000
      })
    }
  })

  const onSubmit = (data: MealFormData) => {
    // mutation.mutate(data)
    console.log(data)
  }

  const saveDraft = () => {
    const values = form.getValues()
    localStorage.setItem('meal-draft', JSON.stringify(values))
    toast.success('Draft saved locally', {
      action: {
        label: 'Clear',
        onClick: () => {
          localStorage.removeItem('meal-draft')
          toast.info('Draft cleared')
        }
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <BasicInformationSection form={form} />
            <ImageUploadSection form={form} />
            <PricingSection form={form} />
            <VariantsSection form={form} />
            <DietarySection form={form} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AvailabilitySection form={form} />
            <PromotionsSection form={form} />
          </div>
        </div>

        {/* Form action buttons */}
        <div className="mt-16 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to reset the form? All changes will be lost.')) {
                    form.reset()
                    localStorage.removeItem('meal-draft')
                    toast.success('Form reset')
                  }
                }}
                disabled={form.formState.isSubmitting}
                className="w-full sm:w-36 px-6"
              >
                Reset Form
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={saveDraft}
                disabled={form.formState.isSubmitting}
                className="w-full sm:w-44 px-6"
              >
                Save Draft
              </Button>
            </div>
            
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || mutation.isPending}
              className="w-full sm:w-52 h-12 px-8 bg-primary hover:bg-primary/90"
              size="lg"
            >
              {form.formState.isSubmitting || mutation.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  <span>Publishing Meal...</span>
                </div>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  <span className="font-medium">Publish Meal</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}