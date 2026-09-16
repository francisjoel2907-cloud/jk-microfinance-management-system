import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  createCustomerSchema,
  type CreateCustomerFormData,
} from "@/validations/customer.validation";

import { useCreateCustomer } from "./useCreateCustomer";

import type { Customer } from "@/types/customer.types";

import { useUpdateCustomer } from "./useUpdateCustomer";

export const useCustomerForm = (customer?: Customer) => {
  const mutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();

  const form = useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerSchema),

    defaultValues: {
      firstName: customer?.firstName ?? "",
      lastName: customer?.lastName ?? "",
      email: customer?.email ?? "",
      phone: customer?.phone ?? "",
      address: customer?.address ?? "",
      nationalId: customer?.nationalId ?? "",
    },
  });
  useEffect(() => {
    form.reset({
      firstName: customer?.firstName ?? "",
      lastName: customer?.lastName ?? "",
      email: customer?.email ?? "",
      phone: customer?.phone ?? "",
      address: customer?.address ?? "",
      nationalId: customer?.nationalId ?? "",
    });
  }, [customer, form]);

  const onSubmit = async (values: CreateCustomerFormData) => {
    if (customer) {
      await updateMutation.mutateAsync({
        id: customer.id,
        payload: values,
      });
    } else {
      await mutation.mutateAsync(values);
    }

    form.reset({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      nationalId: "",
    });
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending || updateMutation.isPending,
  };
};
