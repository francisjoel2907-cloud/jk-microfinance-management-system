import { Loan } from "../loan/loan.types";

type CustomerTotals = {
  totalBorrowed: number;

  totalPaid: number;

  totalOutstanding: number;

  totalPenalties: number;
};

type CustomerStatement = {
  loans: Loan[];

  totals: CustomerTotals;
};

const calculateCustomerStatement = (loans: Loan[]): CustomerStatement => {
  const totalBorrowed = loans.reduce((sum, loan) => sum + loan.totalAmount, 0);

  const totalPaid = loans.reduce((sum, loan) => sum + loan.paidAmount, 0);

  const totalOutstanding = loans.reduce(
    (sum, loan) => sum + loan.remainingAmount,
    0,
  );

  const totalPenalties = loans.reduce(
    (sum, loan: any) => sum + (loan.summary?.totalPenalties || 0),
    0,
  );

  return {
    loans,

    totals: {
      totalBorrowed,

      totalPaid,

      totalOutstanding,

      totalPenalties,
    },
  };
};

export { calculateCustomerStatement };

export type { CustomerStatement };
