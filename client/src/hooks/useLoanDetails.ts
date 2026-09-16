import { useQuery } from "@tanstack/react-query";

import { getLoanById } from "@/api/loan.api";

export const useLoanDetails = (loanId: string | null) => {
  return useQuery({
    queryKey: ["loan", loanId],

    queryFn: () => getLoanById(loanId!),

    enabled: Boolean(loanId),
  });
};
