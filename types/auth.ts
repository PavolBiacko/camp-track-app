import { loginSchema, registerSchema } from "@/validation/auth";
import { z } from "zod";

export type LoginCredentials = {
  email: string;
  password: string;
}

export type RegisterCredentials = LoginCredentials & {
  firstName: string;
  lastName: string;
}

export type LoginFormData = z.infer<typeof loginSchema>;

export type RegisterFormData = z.infer<typeof registerSchema>;