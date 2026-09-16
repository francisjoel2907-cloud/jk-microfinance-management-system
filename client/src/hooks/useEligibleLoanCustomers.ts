import { useQuery } from "@tanstack/react-query";

import { getEligibleLoanCustomers } from "@/api/customer.api";

export const useEligibleLoanCustomers = () => {
  return useQuery({
    queryKey: ["eligible-loan-customers"],

    queryFn: getEligibleLoanCustomers,
  });
};
