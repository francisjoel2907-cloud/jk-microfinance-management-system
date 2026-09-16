export enum InstallmentStatus {
  PENDING = "PENDING",

  PAID = "PAID",

  OVERDUE = "OVERDUE",
}

export type Installment = {
  id: string;

  loanId: string;

  installmentNumber: number;

  amount: number;

  paidAmount: number;

  dueDate: Date;

  paidDate?: Date;

  status: InstallmentStatus;

  createdAt: Date;

  updatedAt: Date;
};

export type InstallmentGenerationPayload = {
  loanId: string;

  totalAmount: number;

  durationMonths: number;

  issuedDate: Date;
};
