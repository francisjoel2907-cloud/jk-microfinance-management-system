import { Wallet, Banknote, Receipt, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/utils/currency";
import KpiCard from "@/components/dashboard/KpiCard";

type Props = {
  totalCollected: number;
  todayCollected: number;
  transactions: number;
  averagePayment: number;
};

const PaymentSummary = ({
  totalCollected,
  todayCollected,
  transactions,
  averagePayment,
}: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Total Collected"
        value={formatCurrency(totalCollected)}
        subtitle="All recorded payments"
        icon={Wallet}
        iconBg="#DCFCE7"
        iconColor="#16A34A"
      />

      <KpiCard
        title="Today's Collections"
        value={formatCurrency(todayCollected)}
        subtitle="Received today"
        icon={Banknote}
        iconBg="#DBEAFE"
        iconColor="#2563EB"
      />

      <KpiCard
        title="Transactions"
        value={transactions}
        subtitle="Successful payments"
        icon={Receipt}
        iconBg="#F3E8FF"
        iconColor="#7C3AED"
      />

      <KpiCard
        title="Average Payment"
        value={formatCurrency(averagePayment)}
        subtitle="Average per transaction"
        icon={TrendingUp}
        iconBg="#FEF3C7"
        iconColor="#D97706"
      />
    </div>
  );
};

export default PaymentSummary;
