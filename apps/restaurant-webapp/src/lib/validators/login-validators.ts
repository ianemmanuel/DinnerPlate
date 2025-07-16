import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Your email address is invalid" }),
  password: z.string().min(6, { message: "Password must be at least 8 characters" }),
})


export type LoginFormValues = z.infer<typeof loginSchema>