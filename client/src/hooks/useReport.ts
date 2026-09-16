import { useQuery } from "@tanstack/react-query";

import { getCollectionReport, getPaymentReport } from "@/api/report.api";

import type {
  CollectionReport,
  PaymentReport,
  ReportPeriod,
} from "@/types/report.types";

export const useReport = (
  period: ReportPeriod,
  startDate?: string,
  endDate?: string,
) => {
  return useQuery<CollectionReport>({
    queryKey: ["collection-report", period, startDate, endDate],
    queryFn: () =>
      getCollectionReport({
        period,
        startDate,
        endDate,
      }),
  });
};

export const usePaymentReport = (
  period: ReportPeriod,
  startDate?: string,
  endDate?: string,
) => {
  return useQuery<PaymentReport[]>({
    queryKey: ["payment-report", period, startDate, endDate],
    queryFn: () =>
      getPaymentReport({
        period,
        startDate,
        endDate,
      }),
  });
};
