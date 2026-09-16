import { LoanStatus } from "@prisma/client";

import type { LoanSummary } from "./loan.summary";

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

  issuedDate: Date;
  dueDate: Date;

  status: LoanStatus;

  createdAt: Date;
  updatedAt: Date;

  customer?: unknown;

  loanOfficer?: unknown;

  installments?: unknown[];

  summary?: LoanSummary;
}

export interface LoanStatistics {
  totalLoans: number;

  activeLoans: number;

  completedLoans: number;

  overdueLoans: number;

  pendingLoans: number;

  totalPortfolio: number;
}

export interface CreateLoanPayload {
  customerId: string;

  principalAmount: number;

  interestRate: number;

  durationMonths: number;

  issuedDate: Date;
}
