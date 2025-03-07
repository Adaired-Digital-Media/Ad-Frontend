import { z } from "zod";
import {
  validatePassword,
  validateConfirmPassword,
} from "./common-rules";

// form zod validation schema
export const resetPasswordSchema = z.object({
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
});

// generate form types from zod validation schema
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;