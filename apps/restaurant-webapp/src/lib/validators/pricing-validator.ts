import { z } from "zod";

// Variant option schema
const variantOptionSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Option label is required"),
  priceModifier: z.number().default(0),
  isDefault: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
});

// Variant schema
const variantSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Variant name is required"),
  isRequired: z.boolean().default(false),
  allowMultiple: z.boolean().default(false),
  options: z.array(variantOptionSchema).min(1, "At least one option is required"),
});

// Add-on schema
const addOnSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Add-on label is required"),
  priceModifier: z.number().min(0, "Price must be positive"),
  isDefault: z.boolean().default(false),
  maxAllowed: z.number().min(1).default(1),
  isRequired: z.boolean().default(false),
});

// Promotion schema
const promotionSchema = z.object({
  id: z.string(),
  type: z.enum(["percentage", "fixed", "bogo", "bundle"]),
  value: z.number().min(0),
  label: z.string().min(1, "Promotion label is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isActive: z.boolean().default(true),
});

// Pricing calculation schema
const pricingCalculationSchema = z.object({
  basePrice: z.number().min(0),
  startingPrice: z.number().min(0),
  maxPrice: z.number().min(0),
  discountedStartingPrice: z.number().min(0).optional(),
  discountedMaxPrice: z.number().min(0).optional(),
  hasActivePromotions: z.boolean().default(false),
});

export const mealFormSchema = z.object({
  // Basic information
  name: z.string().min(1, "Meal name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  
  // Pricing
  price: z.string().min(1, "Base price is required"),
  pricingCalculation: pricingCalculationSchema.optional(),
  
  // Images
  images: z.object({
    main: z.any().nullable(),
    gallery: z.array(z.any()).default([]),
  }),
  
  // Variants and add-ons
  variants: z.array(variantSchema).default([]),
  addOns: z.array(addOnSchema).default([]),
  
  // Dietary information
  dietaryTags: z.array(z.string()).default([]),
  allergens: z.array(z.string()).default([]),
  
  // Promotions
  promotions: z.array(promotionSchema).default([]),
  
  // Availability
  availability: z.object({
    type: z.enum(["always", "schedule", "limited"]),
    schedule: z.record(z.object({
      isAvailable: z.boolean(),
      startTime: z.string().optional(),
      endTime: z.string().optional(),
    })).optional(),
    limitedQuantity: z.number().optional(),
    isActive: z.boolean().default(true),
  }),
  
  // Additional fields
  preparationTime: z.number().min(1).max(300).default(30),
  customPreparationTime: z.boolean().default(false),
  isPopular: z.boolean().default(false),
  isRecommended: z.boolean().default(false),
  
  // Nutrition info
  nutritionInfo: z.object({
    calories: z.string().default(""),
    protein: z.string().default(""),
    carbs: z.string().default(""),
    fat: z.string().default(""),
    fiber: z.string().default(""),
  }).optional(),
});

export type MealFormData = z.infer<typeof mealFormSchema>;
export type VariantOption = z.infer<typeof variantOptionSchema>;
export type Variant = z.infer<typeof variantSchema>;
export type AddOn = z.infer<typeof addOnSchema>;
export type Promotion = z.infer<typeof promotionSchema>;
export type PricingCalculation = z.infer<typeof pricingCalculationSchema>;