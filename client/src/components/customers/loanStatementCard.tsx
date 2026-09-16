import { PageSection } from "@/components/common/PageSection";
import { formatCurrency } from "@/utils/currency";
import InstallmentTable from "./InstallmentTable";
import type { LoanStatement } from "@/types/customerStatement.types";

type LoanStatementCardProps = {
  loan: LoanStatement;
};
const LoanStatementCard = ({ loan }: LoanStatementCardProps) => {
  return (
    <PageSection>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Loan Information
          </h3>

          <span
            className="
              rounded-full
              bg-red-100
              px-3
              py-1
              text-sm
              font-medium
              text-red-700
            "
          >
            {loan.status}
          </span>
        </div>

        {/* Loan Details */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Principal Amount</p>
            <p className="font-semibold">
              {formatCurrency(loan.principalAmount)}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Interest Rate</p>
            <p className="font-semibold">{loan.interestRate}%</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Issued Date</p>
            <p className="font-semibold">
              {new Date(loan.issuedDate).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Due Date</p>
            <p className="font-semibold">
              {new Date(loan.dueDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Loan Summary */}
        <div>
          <h4 className="mb-4 text-base font-semibold text-slate-900">
            Loan Summary
          </h4>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Total Loan</p>
              <p className="font-semibold">
                {formatCurrency(loan.summary.totalLoanAmount)}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Total Paid</p>
              <p className="font-semibold">
                {formatCurrency(loan.summary.totalPaidAmount)}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Outstanding</p>
              <p className="font-semibold">
                {formatCurrency(loan.summary.remainingAmount)}
              </p>
            </div>

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
          </div>
        </div>
        <InstallmentTable installments={loan.installments} />
      </div>
    </PageSection>
  );
};

export default LoanStatementCard;
