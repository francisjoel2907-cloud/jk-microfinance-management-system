import { z } from "zod";

export const createCustomerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),

  lastName: z.string().min(2, "Last name is required"),

  email: z.string().email("Invalid email address"),

  phone: z.string().min(10, "Phone number is required"),

  address: z.string().min(3, "Address is required"),

  nationalId: z.string().min(5, "National ID is required"),
});

export type CreateCustomerFormData = z.infer<typeof createCustomerSchema>;
