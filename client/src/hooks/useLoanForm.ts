import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { createLoan } from "@/api/loan.api";

const schema = z.object({
  customerId: z.string().min(1, "Customer is required"),

  principalAmount: z.coerce.number().min(1000, "Loan amount is required"),

  interestRate: z.coerce
    .number()
    .min(1, "Minimum interest is 1%")
    .max(30, "Maximum interest is 30%"),

  durationMonths: z.coerce
    .number()
    .min(1, "Minimum duration is 1 month")
    .max(60, "Maximum duration is 60 months"),

  issuedDate: z.string().min(1, "Issue date is required"),
});

export const useLoanForm = () => {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      customerId: "",
      principalAmount: 0,
      interestRate: 10,
      durationMonths: 6,
      issuedDate: new Date().toISOString().split("T")[0],
    },
  });

  const mutation = useMutation({
    mutationFn: createLoan,

    onSuccess: () => {
      toast.success("Loan created successfully.");

      queryClient.invalidateQueries({
        queryKey: ["loans"],
      });
    },

    onError: () => {
      toast.error("Failed to create loan.");
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    await mutation.mutateAsync(values);
  };

  return {
    form,

    onSubmit,

    isLoading: mutation.isPending,
  };
};
