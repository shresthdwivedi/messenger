import { z } from "zod";

export const signupSchema = z
.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(3, 'Password must have 3 characters'),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, 'Password must have 3 characters'),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;