import { CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";

type Props = {
  collectionRate: number;
  overdueLoans: number;
};

const PortfolioHealth = ({ collectionRate, overdueLoans }: Props) => {
  const getHealth = () => {
    if (overdueLoans === 0) {
      return {
        title: "Healthy Portfolio",
        message: `Collection rate is ${collectionRate.toFixed(1)}% with no overdue loans.`,
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-700",
        icon: CheckCircle2,
      };
    }

    if (overdueLoans <= 5) {
      return {
        title: "Needs Attention",
        message: `${overdueLoans} overdue loan(s) require follow-up.`,
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
        icon: AlertTriangle,
      };
    }

    return {
      title: "High Risk Portfolio",
      message: `${overdueLoans} overdue loans need immediate action.`,
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      icon: ShieldAlert,
    };
  };

  const health = getHealth();
  const Icon = health.icon;

  return (
    <div className={`rounded-2xl border p-4 ${health.bg} ${health.border}`}>
      <div className="flex items-center gap-2">
        <Icon size={22} className={health.text} />
        <h3 className={`font-semibold ${health.text}`}>{health.title}</h3>
      </div>

      <p className={`mt-2 text-sm ${health.text}`}>{health.message}</p>
    </div>
  );
};

export default PortfolioHealth;
