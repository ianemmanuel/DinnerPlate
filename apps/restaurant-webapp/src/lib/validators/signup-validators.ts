import { z } from 'zod';

// Step 1: Business Type
export const businessTypeSchema = z.object({
  businessType: z.enum(['restaurant', 'commercial_kitchen'], {
    required_error: 'Please select a business type',
  }),
});

// Step 2: Create Account
export const createAccountSchema = z.object({
  businessName: z
    .string()
    .min(2, { message: 'Business name must be at least 2 characters' })
    .max(100, { message: 'Business name must be less than 100 characters' }),
  businessEmail: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  ownerFirstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(50, { message: 'First name must be less than 50 characters' }),
  ownerLastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(50, { message: 'Last name must be less than 50 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(100, { message: 'Password must be less than 100 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
  agreedToTerms: z.boolean()
    .refine(val => val === true, {
      message: 'You must agree to the terms of service'
    }),
})

// Step 3: Email Verification
export const emailVerificationSchema = z.object({
  emailOtp: z
    .string()
    .length(6, { message: 'OTP must be 6 digits' })
    .regex(/^\d+$/, { message: 'OTP must contain only numbers' }),
});

// Step 4: Business Profile
export const businessProfileSchema = z.object({
  legalBusinessName: z.string().optional(),
  businessPhone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .regex(/^\+?[0-9\s\-()]+$/, { message: 'Please enter a valid phone number' }),
  country: z.string().min(2, { message: 'Please select a country' }),
  city: z.string().min(2, { message: 'City is required' }),
  street: z.string().min(2, { message: 'Street address is required' }),
  postalCode: z.string().min(2, { message: 'Postal code is required' }),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  // Document validation will be handled separately with file upload logic
})

// Step 5: Phone Verification
export const phoneVerificationSchema = z.object({
  phoneOtp: z
    .string()
    .length(6, { message: 'OTP must be 6 digits' })
    .regex(/^\d+$/, { message: 'OTP must contain only numbers' }),
})

// Step 6: Review & Final Submission
export const reviewSubmissionSchema = z.object({
  confirmSubmission: z.boolean()
    .refine(val => val === true, {
      message: 'You must confirm that all information is correct',
    }),
})

export type BusinessTypeFormValues = z.infer<typeof businessTypeSchema>
export type CreateAccountFormValues = z.infer<typeof createAccountSchema>
export type EmailVerificationFormValues = z.infer<typeof emailVerificationSchema>
export type BusinessProfileFormValues = z.infer<typeof businessProfileSchema>
export type PhoneVerificationFormValues = z.infer<typeof phoneVerificationSchema>
export type ReviewSubmissionFormValues = z.infer<typeof reviewSubmissionSchema>