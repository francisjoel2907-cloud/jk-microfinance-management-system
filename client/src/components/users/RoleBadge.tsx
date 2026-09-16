import { Shield, UserCog, Calculator, Wallet } from "lucide-react";
import { USER_ROLES, type UserRole } from "@/types/user.types";

type Props = {
  role: UserRole;
};

const roleConfig = {
  [USER_ROLES.SUPER_ADMIN]: {
    label: "Super Admin",
    icon: Shield,
    className: "bg-purple-100 text-purple-700 border border-purple-200",
  },

  [USER_ROLES.ADMIN]: {
    label: "Admin",
    icon: UserCog,
    className: "bg-blue-100 text-blue-700 border border-blue-200",
  },

  [USER_ROLES.ACCOUNTANT]: {
    label: "Accountant",
    icon: Calculator,
    className: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  },

  [USER_ROLES.CASHIER]: {
    label: "Cashier",
    icon: Wallet,
    className: "bg-amber-100 text-amber-700 border border-amber-200",
  },
};

const RoleBadge = ({ role }: Props) => {
  const config = roleConfig[role] ?? {
    label: role,
    icon: Shield,
    className: "bg-slate-100 text-slate-700 border border-slate-200",
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      <Icon size={12} />
      {config.label}
    </span>
  );
};

export default RoleBadge;
