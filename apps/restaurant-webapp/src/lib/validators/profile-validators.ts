import * as z from 'zod'


const dayScheduleSchema = z.object({
  isOpen: z.boolean(),
  openTime: z.string().refine(val => val === '' || /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val), {
    message: "Invalid time format (HH:MM)"
  }).optional(),
  closeTime: z.string().refine(val => val === '' || /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val), {
    message: "Invalid time format (HH:MM)"
  }).optional()
})


export const vendorProfileSchema = z.object({
  vendorId: z.string().min(1, 'Vendor ID is required'),
  bio: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  cuisines: z.array(z.string().min(1, "Each cuisine must not be empty")),
  customCuisine: z.string().optional(),
  priceRange: z.enum(['BUDGET', 'MID_RANGE', 'PREMIUM'], {
    required_error: 'Price range is required',
  }),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string().url("Please enter a valid URL")
  })).optional(),
  images: z.array(z.any()).optional(),
  estimatedDeliveryTime: z.number().min(10, 'Delivery time must be at least 10 minutes').max(120, 'Delivery time cannot exceed 120 minutes'),
  isActive: z.boolean().default(true),
  hasDelivery: z.boolean().default(true),
  hasPickup: z.boolean().default(false),
  website: z.string().url("Please enter a valid URL").optional(),
  openingHours: z.object({
    monday: dayScheduleSchema,
    tuesday: dayScheduleSchema,
    wednesday: dayScheduleSchema,
    thursday: dayScheduleSchema,
    friday: dayScheduleSchema,
    saturday: dayScheduleSchema,
    sunday: dayScheduleSchema
  })
}).superRefine((data, ctx) => {
  // If no cuisines are selected and no custom cuisine is provided
  if (data.cuisines.length === 0 && !data.customCuisine) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "You must select at least one cuisine or provide a custom cuisine",
      path: ["cuisines"]
    })
  }

  // If "other" is selected but custom cuisine is empty
  if (data.cuisines.includes('other') && !data.customCuisine) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please describe your custom cuisine",
      path: ["customCuisine"]
    })
  }
  const days = Object.keys(data.openingHours) as Array<keyof typeof data.openingHours>
  days.forEach(day => {
    const daySchedule = data.openingHours[day]
    if (daySchedule.isOpen) {
      if (!daySchedule.openTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Opening time is required for ${day}`,
          path: [`openingHours.${day}.openTime`]
        })
      }
      if (!daySchedule.closeTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Closing time is required for ${day}`,
          path: [`openingHours.${day}.closeTime`]
        })
      }
    }
  })
})

export type VendorProfileFormData = z.infer<typeof vendorProfileSchema>