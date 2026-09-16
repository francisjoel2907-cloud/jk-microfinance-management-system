import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { updateCustomer } from "@/api/customer.api";

import type { CreateCustomerPayload } from "@/types/customer.types";

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: CreateCustomerPayload;
    }) => updateCustomer(id, payload),

    onSuccess: () => {
      toast.success("Customer updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update customer",
      );
    },
  });
};
