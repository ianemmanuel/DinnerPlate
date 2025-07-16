import { z } from 'zod'

export const bankAccountSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
  branchName: z.string().min(1, 'Branch name or code is required'),
  bankCode: z.string().optional().refine((val) => {
    if (!val) return true
    return /^\d{2,3}$/.test(val)
  }, 'Bank code must be 2-3 digits'),
  accountNumber: z.string()
    .min(1, 'Account number is required')
    .regex(/^\d{8,16}$/, 'Account number must be 8-16 digits'),
  accountName: z.string().min(1, 'Account name is required'),
  swiftCode: z.string().optional().refine((val) => {
    if (!val) return true
    return /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(val)
  }, 'Invalid SWIFT code format'),
  confirmDetails: z.boolean().refine((val) => val === true, 'You must confirm the details are correct'),
})

export type BankAccountFormData = z.infer<typeof bankAccountSchema>
