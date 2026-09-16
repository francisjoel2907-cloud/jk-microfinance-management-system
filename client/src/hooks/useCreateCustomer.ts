import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { createCustomer } from "@/api/customer.api";

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,

    onSuccess: () => {
      toast.success("Customer created successfully.");

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? "Failed to create customer.",
      );
    },
  });
};
