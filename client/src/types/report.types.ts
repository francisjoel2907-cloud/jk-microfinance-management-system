export interface CollectionReport {
  totalCollected: number;
  todayCollections: number;
  monthlyCollections: number;
  paymentsCount: number;
}

export interface PaymentReport {
  id: string;
  customerName: string;
  phone: string;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  referenceNumber: string | null;
  processedBy: string;
}

export type ReportPeriod = "today" | "week" | "month" | "year" | "custom";

export interface PaymentReportParams {
  period: ReportPeriod;
  startDate?: string;
  endDate?: string;
}
