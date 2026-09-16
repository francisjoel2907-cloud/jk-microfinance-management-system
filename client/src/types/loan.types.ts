import type { Customer } from "./customer.types";

export type LoanStatus =
  | "PENDING"
  | "APPROVED"
  | "ACTIVE"
  | "COMPLETED"
  | "OVERDUE"
  | "REJECTED";

export interface LoanSummary {
  totalLoanAmount: number;
  totalPaidAmount: number;
  remainingAmount: number;
  totalPenalties: number;
  totalDueAmount: number;
}

export interface LoanOfficer {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  role: string;

  isActive: boolean;
}

export interface LoanInstallment {
  id: string;

  loanId: string;

  installmentNumber: number;

  amount: number;

  paidAmount: number;

  penaltyAmount: number;

  dueDate: string;

  paidDate: string | null;

  status: "PENDING" | "PAID" | "OVERDUE";

  createdAt: string;

  updatedAt: string;
}

export interface LoanPayment {
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

export interface Loan {
  id: string;

  customerId: string;

  loanOfficerId: string;

  principalAmount: number;

  interestRate: number;

  totalAmount: number;

  paidAmount: number;

  remainingAmount: number;

  durationMonths: number;

  issuedDate: string;

  dueDate: string;

  status: LoanStatus;

  createdAt: string;

  updatedAt: string;

  customer: Customer;

  summary: LoanSummary;
}

export interface LoanDetails extends Loan {
  loanOfficer: LoanOfficer;

  installments: LoanInstallment[];

  payments: LoanPayment[];
}

export interface LoanStatistics {
  totalLoans: number;

  activeLoans: number;

  completedLoans: number;

  overdueLoans: number;

  pendingLoans: number;

  totalPortfolio: number;
}

export interface LoanResponse {
  statistics: LoanStatistics;

  loans: Loan[];
}

export interface LoanDetailsResponse {
  loan: LoanDetails;
}

export interface CreateLoanPayload {
  customerId: string;

  principalAmount: number;

  interestRate: number;

  durationMonths: number;

  issuedDate: string;
}

export interface CreateLoanFormData {
  customerId: string;

  principalAmount: number;

  interestRate: number;

  durationMonths: number;

  issuedDate: string;
}
