import { useQuery } from "@tanstack/react-query";

import { getCustomerStatement } from "@/api/customer.api";

import type { CustomerStatement } from "@/types/customerStatement.types";

export const useCustomerStatement = (customerId: string, enabled = true) => {
  return useQuery<CustomerStatement>({
    queryKey: ["customer-statement", customerId],

    queryFn: () => getCustomerStatement(customerId),

    enabled: enabled && !!customerId,
  });
};
