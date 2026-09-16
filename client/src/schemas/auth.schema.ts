import { z } from "zod";
import { USER_ROLES } from "@/types/user.types";

// ==========================================
// Login Schema
// ==========================================

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z.string().min(8, "Password is required"),
});

// ==========================================
// Register Schema
// ==========================================

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),

    lastName: z.string().min(2, "Last name is required"),

    email: z.string().email("Invalid email address"),

    phone: z
      .string()
      .regex(/^255\d{9}$/, "Phone number must be in format 255712345678"),

    role: z.enum([USER_ROLES.ADMIN, USER_ROLES.ACCOUNTANT, USER_ROLES.CASHIER]),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[0-9]/, "Password must contain a number")
      .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// ==========================================
// Form Types
// ==========================================

export type LoginFormData = z.infer<typeof loginSchema>;

export type RegisterFormData = z.infer<typeof registerSchema>;
