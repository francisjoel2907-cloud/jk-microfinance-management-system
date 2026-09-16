import { AlertTriangle, CreditCard, Wallet, HandCoins } from "lucide-react";

import { StatCard } from "@/components/common/StatCard";
import { formatCurrency } from "@/utils/currency";

type StatementSummaryProps = {
  totalBorrowed: number;
  totalPaid: number;
  totalOutstanding: number;
  totalPenalties: number;
};

const StatementSummary = ({
  totalBorrowed,
  totalPaid,
  totalOutstanding,
  totalPenalties,
}: StatementSummaryProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Borrowed"
        value={formatCurrency(totalBorrowed)}
        description="Total amount borrowed"
        icon={<HandCoins size={24} />}
      />

      <StatCard
        title="Total Paid"
        value={formatCurrency(totalPaid)}
        description="Amount repaid"
        icon={<CreditCard size={24} />}
      />

      <StatCard
        title="Outstanding"
        value={formatCurrency(totalOutstanding)}
        description="Remaining balance"
        icon={<Wallet size={24} />}
      />

      <StatCard
        title="Penalties"
        value={formatCurrency(totalPenalties)}
        description="Accumulated penalties"
        icon={<AlertTriangle size={24} />}
      />
    </div>
  );
};

export default StatementSummary;
