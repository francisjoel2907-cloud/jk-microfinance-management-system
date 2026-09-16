import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { createLoan } from "@/api/loan.api";

import type { CreateLoanPayload } from "@/types/loan.types";

export const useCreateLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLoanPayload) => createLoan(payload),

    onSuccess: () => {
      toast.success("Loan created successfully.");

      queryClient.invalidateQueries({
        queryKey: ["loans"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to create loan.");
    },
  });
};
