import LoanCard from "./LoanCard";

import type { Loan } from "@/types/loan.types";

type LoansListProps = {
  loans: Loan[];
};

const LoansList = ({ loans }: LoansListProps) => {
  if (loans.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="text-lg font-semibold text-slate-900">No loans found</h3>

        <p className="mt-2 text-sm text-slate-500">
          There are currently no loans available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        lg:grid-cols-2
      "
    >
      {loans.map((loan) => (
        <LoanCard key={loan.id} loan={loan} />
      ))}
    </div>
  );
};

export default LoansList;
