import { Payment } from "./payment.types";

type PaymentReceipt = {
  receiptNumber: string;

  paymentId: string;

  loanId: string;

  amount: number;

  paymentMethod: string;

  paymentDate: Date;

  referenceNumber?: string | null;

  processedById: string;
};

const generateReceiptNumber = (): string => {
  const timestamp = Date.now();

  return `RCT-${timestamp}`;
};

const createPaymentReceipt = (payment: Payment): PaymentReceipt => {
  return {
    receiptNumber: generateReceiptNumber(),

    paymentId: payment.id,

    loanId: payment.loanId,

    amount: payment.amount,

    paymentMethod: payment.paymentMethod,

    paymentDate: payment.paymentDate,

    referenceNumber: payment.referenceNumber,

    processedById: payment.processedById,
  };
};

export { generateReceiptNumber, createPaymentReceipt };

export type { PaymentReceipt };
