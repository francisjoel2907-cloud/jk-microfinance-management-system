import { PageSection } from "@/components/common/PageSection";
import { formatCurrency } from "@/utils/currency";

import type { Loan } from "@/types/loan.types";

type LoanCardProps = {
  loan: Loan;
};

const LoanCard = ({ loan }: LoanCardProps) => {
  return (
    <PageSection>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {loan.customer.firstName} {loan.customer.lastName}
            </h3>

            <p className="text-sm text-slate-500">{loan.customer.phone}</p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              loan.status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : loan.status === "ACTIVE"
                  ? "bg-blue-100 text-blue-700"
                  : loan.status === "OVERDUE"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {loan.status}
          </span>
        </div>

        {/* Loan Information */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-slate-500">Principal</p>

            <p className="font-semibold">
              {formatCurrency(loan.principalAmount)}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Total Loan</p>

            <p className="font-semibold">{formatCurrency(loan.totalAmount)}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Paid</p>

            <p className="font-semibold text-green-700">
              {formatCurrency(loan.paidAmount)}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Remaining</p>

            <p className="font-semibold text-red-600">
              {formatCurrency(loan.remainingAmount)}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Issued Date</p>

            <p className="font-medium">
              {new Date(loan.issuedDate).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Due Date</p>

            <p className="font-medium">
              {new Date(loan.dueDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">Penalties</p>

            <p className="font-semibold">
              {formatCurrency(loan.summary.totalPenalties)}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Total Due</p>

            <p className="font-semibold">
              {formatCurrency(loan.summary.totalDueAmount)}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Installments</p>

            <p className="font-semibold">{loan.installments.length}</p>
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default LoanCard;
