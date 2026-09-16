import { PageSection } from "@/components/common/PageSection";
import { formatCurrency } from "@/utils/currency";

type LoanStatisticsProps = {
  totalLoans: number;
  activeLoans: number;
  completedLoans: number;
  overdueLoans: number;
  totalAmount: number;
};

const LoanStatistics = ({
  totalLoans,
  activeLoans,
  completedLoans,
  overdueLoans,
  totalAmount,
}: LoanStatisticsProps) => {
  return (
    <PageSection>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <div>
          <p className="text-sm text-slate-500">Total Loans</p>
          <h3 className="text-2xl font-bold">{totalLoans}</h3>
        </div>

        <div>
          <p className="text-sm text-slate-500">Active</p>
          <h3 className="text-2xl font-bold text-green-600">{activeLoans}</h3>
        </div>

        <div>
          <p className="text-sm text-slate-500">Completed</p>
          <h3 className="text-2xl font-bold text-blue-600">{completedLoans}</h3>
        </div>

        <div>
          <p className="text-sm text-slate-500">Overdue</p>
          <h3 className="text-2xl font-bold text-red-600">{overdueLoans}</h3>
        </div>

        <div>
          <p className="text-sm text-slate-500">Portfolio</p>
          <h3 className="text-xl font-bold">{formatCurrency(totalAmount)}</h3>
        </div>
      </div>
    </PageSection>
  );
};

export default LoanStatistics;
