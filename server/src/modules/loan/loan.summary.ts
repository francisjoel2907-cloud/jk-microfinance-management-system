type LoanSummary = {
  totalLoanAmount: number;

  totalPaidAmount: number;

  remainingAmount: number;

  totalPenalties: number;

  totalDueAmount: number;
};

const calculateLoanSummary = (
  loanAmount: number,
  paidAmount: number,
  remainingAmount: number,
  penalties: number,
): LoanSummary => {
  return {
    totalLoanAmount: loanAmount,

    totalPaidAmount: paidAmount,

    remainingAmount,

    totalPenalties: penalties,

    totalDueAmount: remainingAmount + penalties,
  };
};

export { calculateLoanSummary };

export type { LoanSummary };
