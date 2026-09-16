import api from "@/lib/api";
import type {
  CreatePaymentPayload,
  PaymentHistory,
  PaymentHistoryParams,
} from "@/types/payment.types";

export const createPayment = async (payload: CreatePaymentPayload) => {
  const response = await api.post("/payments", payload);

  return response.data;
};

export const getPayments = async ({
  period,
  startDate,
  endDate,
}: PaymentHistoryParams): Promise<PaymentHistory[]> => {
  const response = await api.get("/payments", {
    params: {
      period,
      startDate,
      endDate,
    },
  });

  return response.data.data;
};

export const getPaymentReceipt = async (paymentId: string) => {
  const response = await api.get(`/payments/${paymentId}/receipt`);
  return response.data.data;
};
