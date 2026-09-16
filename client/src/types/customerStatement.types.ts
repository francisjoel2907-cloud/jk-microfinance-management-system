export interface StatementCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string;
  address: string;
  nationalId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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

export interface InstallmentStatement {
  id: string;
  loanId: string;
  installmentNumber: number;
  amount: number;
  paidAmount: number;
  penaltyAmount: number;
  dueDate: string;
  paidDate: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoanSummary {
  totalLoanAmount: number;
  totalPaidAmount: number;
  remainingAmount: number;
  totalPenalties: number;
  totalDueAmount: number;
}

export interface LoanStatement {
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

  status: string;

  createdAt: string;
  updatedAt: string;

  installments: InstallmentStatement[];

  customer: StatementCustomer;

  loanOfficer: LoanOfficer;

  summary: LoanSummary;
}

export interface StatementTotals {
  totalBorrowed: number;
  totalPaid: number;
  totalOutstanding: number;
  totalPenalties: number;
}

export interface CustomerStatement {
  loans: LoanStatement[];
  totals: StatementTotals;
}

export interface CustomerStatementResponse {
  success: boolean;
  message: string;
  data: CustomerStatement;
}
