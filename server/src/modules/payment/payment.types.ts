export enum PaymentMethod {
  CASH = "CASH",
  MOBILE_MONEY = "MOBILE_MONEY",
  BANK_TRANSFER = "BANK_TRANSFER",
}

export interface Payment {
  id: string;
  loanId: string;
  processedById: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: Date;
  referenceNumber: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentPayload {
  loanId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: Date;
  referenceNumber?: string;
  notes?: string;
}

export interface PaymentHistory {
  id: string;
  customerName: string;
  phone: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: Date;
  referenceNumber: string | null;
  processedBy: string;
}
