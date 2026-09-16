import { z } from "zod";

import { PaymentMethod } from "./payment.types";

const createPaymentSchema = z.object({
  loanId: z.string().uuid("Invalid loan ID"),

  amount: z.number().positive("Payment amount must be greater than 0"),

  paymentMethod: z.nativeEnum(PaymentMethod),

  paymentDate: z.coerce.date(),

  referenceNumber: z.string().optional(),

  notes: z.string().optional(),
});

const paymentValidation = {
  createPaymentSchema,
};

export default paymentValidation;
