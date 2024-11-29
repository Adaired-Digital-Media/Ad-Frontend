import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from './common-rules';

// form zod validation schema
export const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: messages.firstNameRequired }),
    lastName: z.string().optional(),
    email: validateEmail,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
    phoneNumber: z.string().min(1, { message: messages.phoneNumberIsRequired }),
    isAgreed: z.boolean().refine((val) => val === true, {
      message: messages.isAgreedRequired,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: messages.passwordsDidNotMatch,
    path: ['confirmPassword'],
  });

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;
