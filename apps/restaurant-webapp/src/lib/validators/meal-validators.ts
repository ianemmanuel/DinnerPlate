import { z } from "zod";

export const mealFormSchema = z.object({
  name: z.string().min(1, "Meal name is required").max(100, "Name must be under 100 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be under 500 characters"),
  
  images: z.object({
    main: z.any().nullable(),
    gallery: z.array(z.any()).max(5, "Maximum 5 gallery images allowed")
  }),
  
  variants: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, "Variant name is required"),
    options: z.array(z.object({
      id: z.string(),
      label: z.string().min(1, "Option label is required"),
      priceModifier: z.number().default(0),
      isDefault: z.boolean().default(false),
      isAvailable: z.boolean().default(true)
    })).min(1, "At least one option is required"),
    isRequired: z.boolean().default(false),
    allowMultiple: z.boolean().default(false)
  })),
  
  addOns: z.array(z.object({
    id: z.string(),
    label: z.string().min(1, "Add-on label is required"),
    priceModifier: z.number().min(0, "Price must be positive"),
    isDefault: z.boolean().default(false),
    maxAllowed: z.number().optional(),
    isRequired: z.boolean().default(false)
  })),
  
  dietaryTags: z.array(z.string()),
  allergens: z.array(z.string()),
  
  promotions: z.array(z.object({
    id: z.string(),
    type: z.enum(["percentage", "fixed", "bogo", "bundle"]),
    value: z.number().min(0),
    label: z.string().min(1, "Promotion label is required"),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    isActive: z.boolean().default(true)
  })),
  
  availability: z.object({
    type: z.enum(["always", "schedule", "limited"]),
    schedule: z.record(z.object({
      isAvailable: z.boolean(),
      startTime: z.string().optional(),
      endTime: z.string().optional()
    })).optional(),
    isActive: z.boolean().default(true),
    limitedQuantity: z.number().optional()
  }),
  
  preparationTime: z.number().min(1, "Preparation time must be at least 1 minute").max(300, "Preparation time cannot exceed 5 hours"),
  customPreparationTime: z.boolean().default(false),
  
  isPopular: z.boolean().default(false),
  isRecommended: z.boolean().default(false),
  
  nutritionInfo: z.object({
    calories: z.string().optional(),
    protein: z.string().optional(),
    carbs: z.string().optional(),
    fat: z.string().optional(),
    fiber: z.string().optional()
  }).optional()
});

export type MealFormData = z.infer<typeof mealFormSchema>;