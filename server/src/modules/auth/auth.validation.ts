import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),

  lastName: z.string().min(2, "Last name is required"),

  email: z.string().email("Invalid email address"),

  phone: z
    .string()
    .regex(/^255\d{9}$/, "Phone number must be in format 255XXXXXXXXX"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must contain uppercase, lowercase, number and special character",
    ),

  role: z.enum(["SUPER_ADMIN", "ADMIN", "ACCOUNTANT", "CASHIER"]),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

const authValidation = {
  registerSchema,

  loginSchema,
};

export default authValidation;
