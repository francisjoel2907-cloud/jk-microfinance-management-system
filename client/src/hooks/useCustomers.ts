import { useQuery } from "@tanstack/react-query";

import { getCustomers } from "@/api/customer.api";

import type { Customer } from "@/types/customer.types";

export const useCustomers = () => {
  return useQuery<Customer[]>({
    queryKey: ["customers"],

    queryFn: getCustomers,
  });
};
