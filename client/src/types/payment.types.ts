export const PAYMENT_METHODS = {
  CASH: "CASH",
  BANK_TRANSFER: "BANK_TRANSFER",
  MOBILE_MONEY: "MOBILE_MONEY",
} as const;

export type PaymentMethod =
  (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];

export interface CreatePaymentPayload {
  loanId: string;

  amount: number;

  paymentMethod: PaymentMethod;

  paymentDate: string;

  referenceNumber?: string;

  notes?: string;
}

export interface PaymentHistory {
  id: string;
  customerName: string;
  phone: string;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  referenceNumber: string | null;
  processedBy: string;
}

export type PaymentPeriod = "today" | "week" | "month" | "year" | "custom";

export interface PaymentHistoryParams {
  period: PaymentPeriod;
  startDate?: string;
  endDate?: string;
}
