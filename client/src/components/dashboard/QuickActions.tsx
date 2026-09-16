import { useNavigate } from "react-router-dom";
import { UserPlus, Wallet, Banknote, FileBarChart } from "lucide-react";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Customer",
      icon: UserPlus,
      color: "bg-green-600 hover:bg-green-700",
      path: "/customers",
    },
    {
      title: "New Loan",
      icon: Wallet,
      color: "bg-blue-600 hover:bg-blue-700",
      path: "/loans",
    },
    {
      title: "Receive Payment",
      icon: Banknote,
      color: "bg-violet-600 hover:bg-violet-700",
      path: "/payments",
    },
    {
      title: "Reports",
      icon: FileBarChart,
      color: "bg-orange-600 hover:bg-orange-700",
      path: "/reports",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
        <p className="text-sm text-slate-500">Frequently used operations</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className={`${action.color} rounded-2xl p-4 text-white transition-all duration-200 hover:-translate-y-1`}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon size={28} />
                <span className="text-sm font-medium text-center">
                  {action.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
