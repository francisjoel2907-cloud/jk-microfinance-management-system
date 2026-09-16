import { useQuery } from "@tanstack/react-query";

import { getLoans } from "@/api/loan.api";

import type { LoanResponse } from "@/types/loan.types";

export const useLoans = () => {
  return useQuery<LoanResponse>({
    queryKey: ["loans"],

    queryFn: getLoans,
  });
};
