import { z } from 'zod';

export const EmailRegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters.').max(100),
    firstName: z.string().min(1, 'Enter first name').max(100),
    lastName: z.string().min(1, 'Enter last name').max(100),
    dateOfBirth: z.string().min(10).max(100),
});

export type EmailRegisterSchemaType = z.infer<typeof EmailRegisterSchema>;

export const PhoneRegisterSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(1, 'Enter first name').max(100),
    lastName: z.string().min(1, 'Enter last name').max(100),
    dateOfBirth: z.string().min(10).max(100),
});

export type PhoneRegisterSchemaType = z.infer<typeof PhoneRegisterSchema>;
