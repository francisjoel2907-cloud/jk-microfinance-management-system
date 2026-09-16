import { useQuery } from "@tanstack/react-query";
import { getPaymentReceipt } from "@/api/payment.api";

export const usePaymentReceipt = (paymentId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["payment-receipt", paymentId],
    queryFn: () => getPaymentReceipt(paymentId),
    enabled,
  });
};
