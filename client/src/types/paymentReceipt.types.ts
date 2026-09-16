export interface PaymentReceipt {
  receiptNumber: string;

  paymentId: string;

  loanId: string;

  amount: number;

  paymentMethod: string;

  paymentDate: string;

  referenceNumber: string | null;

  processedById: string;
}

export interface Payment {
  id: string;

  loanId: string;

  processedById: string;

  amount: number;

  paymentMethod: string;

  paymentDate: string;

  referenceNumber: string | null;

  notes: string | null;

  createdAt: string;

  updatedAt: string;
}

export interface PaymentResult {
  payment: Payment;

  receipt: PaymentReceipt;
}

export interface CreatePaymentResponse {
  success: boolean;

  message: string;

  data: PaymentResult;
}
