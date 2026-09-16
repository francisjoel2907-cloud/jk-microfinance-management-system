import { z } from "zod";

const createLoanSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),

  principalAmount: z
    .number()
    .positive("Principal amount must be greater than 0"),

  interestRate: z
    .number()
    .positive("Interest rate must be greater than 0")
    .max(30, "Interest rate cannot exceed 30%"),

  durationMonths: z
    .number()
    .int("Duration must be a whole number")
    .positive("Duration must be greater than 0"),

  issuedDate: z.coerce.date(),
});

const loanValidation = {
  createLoanSchema,
};

export default loanValidation;
