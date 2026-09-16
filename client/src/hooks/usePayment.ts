import { useQuery } from "@tanstack/react-query";
import { getPayments } from "@/api/payment.api";
import type {
  PaymentHistory,
  PaymentHistoryParams,
} from "@/types/payment.types";

export const usePayment = ({
  period,
  startDate,
  endDate,
}: PaymentHistoryParams) => {
  return useQuery<PaymentHistory[]>({
    queryKey: ["payments", period, startDate, endDate],
    queryFn: () =>
      getPayments({
        period,
        startDate,
        endDate,
      }),
  });
};
