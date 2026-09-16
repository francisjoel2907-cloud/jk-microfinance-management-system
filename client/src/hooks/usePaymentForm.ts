import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { createPayment } from "@/api/payment.api";

import {
  PAYMENT_METHODS,
  type CreatePaymentPayload,
} from "@/types/payment.types";

const schema = z
  .object({
    loanId: z.string().min(1, "Loan is required"),

    amount: z.coerce.number().positive("Payment amount must be greater than 0"),

    paymentMethod: z.enum([
      PAYMENT_METHODS.CASH,
      PAYMENT_METHODS.BANK_TRANSFER,
      PAYMENT_METHODS.MOBILE_MONEY,
    ]),

    paymentDate: z.string().min(1, "Payment date is required"),

    referenceNumber: z.string().optional(),

    notes: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const requiresReference =
      data.paymentMethod === PAYMENT_METHODS.MOBILE_MONEY ||
      data.paymentMethod === PAYMENT_METHODS.BANK_TRANSFER;

    if (requiresReference && !data.referenceNumber?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["referenceNumber"],
        message: "Reference number is required for this payment method",
      });
    }
  });

export const usePaymentForm = (loanId: string) => {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      loanId,

      amount: 0,

      paymentMethod: PAYMENT_METHODS.CASH,

      paymentDate: new Date().toISOString().split("T")[0],

      referenceNumber: "",

      notes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CreatePaymentPayload) => createPayment(data),

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to record payment.",
        );
        return;
      }

      toast.error("Failed to record payment.");
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const response = await mutation.mutateAsync(values);

    toast.success("Payment recorded successfully.");

    queryClient.invalidateQueries({
      queryKey: ["loans"],
    });

    queryClient.invalidateQueries({
      queryKey: ["payments"],
    });

    form.reset({
      loanId,

      amount: 0,

      paymentMethod: PAYMENT_METHODS.CASH,

      paymentDate: new Date().toISOString().split("T")[0],

      referenceNumber: "",

      notes: "",
    });

    return response.data.receipt;
  };

  return {
    form,

    onSubmit,

    isLoading: mutation.isPending,
  };
};
