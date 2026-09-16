import type { Loan } from "./loan.types";

import { LoanStatus } from "@prisma/client";

export const calculateLoanStatistics = (loans: Loan[]) => {
  return {
    totalLoans: loans.length,

    activeLoans: loans.filter((loan) => loan.status === LoanStatus.ACTIVE)
      .length,

    completedLoans: loans.filter((loan) => loan.status === LoanStatus.COMPLETED)
      .length,

    overdueLoans: loans.filter((loan) => loan.status === LoanStatus.OVERDUE)
      .length,

    pendingLoans: loans.filter((loan) => loan.status === LoanStatus.PENDING)
      .length,

    totalPortfolio: loans.reduce((sum, loan) => sum + loan.totalAmount, 0),
  };
};
