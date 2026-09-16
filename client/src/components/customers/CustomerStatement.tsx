import { useCustomerStatement } from "@/hooks/useCustomerStatement";
import { PageSection } from "@/components/common/PageSection";
import StatementSummary from "@/components/customers/StatementSummary";
import LoanStatementCard from "./loanStatementCard";

type CustomerStatementProps = {
  customerId: string;
};

const CustomerStatement = ({ customerId }: CustomerStatementProps) => {
  const { data, isLoading, error } = useCustomerStatement(customerId);

  if (isLoading) {
    return (
      <div className="py-10 text-center text-slate-500">
        Loading customer statement...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-10 text-center text-red-500">
        Failed to load customer statement.
      </div>
    );
  }

  console.log("Customer Statement:", data);

  return (
    <div className="space-y-6">
      <PageSection>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Customer Statement
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Financial summary and loan information.
          </p>
        </div>

        <StatementSummary
          totalBorrowed={data.totals.totalBorrowed}
          totalPaid={data.totals.totalPaid}
          totalOutstanding={data.totals.totalOutstanding}
          totalPenalties={data.totals.totalPenalties}
        />
      </PageSection>

      <div className="space-y-6">
        {data.loans.map((loan) => (
          <LoanStatementCard key={loan.id} loan={loan} />
        ))}
      </div>
    </div>
  );
};

export default CustomerStatement;
