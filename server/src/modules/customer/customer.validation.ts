import { z } from "zod";

const createCustomerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),

  lastName: z.string().min(2, "Last name is required"),

  email: z.string().email("Invalid email address").optional().or(z.literal("")),

  phone: z.string().min(10, "Phone number is required"),

  address: z.string().min(3, "Address is required"),

  nationalId: z.string().min(20, "National ID is required"),
});

const updateCustomerSchema = createCustomerSchema;

const customerValidation = {
  createCustomerSchema,

  updateCustomerSchema,
};

export default customerValidation;
