import api from "@/lib/api";

import type {
  CollectionReport,
  PaymentReport,
  PaymentReportParams,
} from "@/types/report.types";

export const getCollectionReport = async ({
  period,
  startDate,
  endDate,
}: PaymentReportParams): Promise<CollectionReport> => {
  const response = await api.get("/reports/collections", {
    params: {
      period,
      startDate,
      endDate,
    },
  });

  return response.data.data;
};

export const getPaymentReport = async ({
  period,
  startDate,
  endDate,
}: PaymentReportParams): Promise<PaymentReport[]> => {
  const response = await api.get("/reports/payments", {
    params: {
      period,
      startDate,
      endDate,
    },
  });

  return response.data.data;
};
