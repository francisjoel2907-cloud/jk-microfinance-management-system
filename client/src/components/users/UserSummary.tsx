import { Users, UserCheck, Shield, Wallet } from "lucide-react";

import KpiCard from "@/components/dashboard/KpiCard";

type Props = {
  totalUsers: number;
  activeUsers: number;
  admins: number;
  cashiers: number;
};

const UserSummary = ({ totalUsers, activeUsers, admins, cashiers }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Total Staff"
        value={totalUsers}
        subtitle="Registered employees"
        icon={Users}
        iconBg="#DBEAFE"
        iconColor="#2563EB"
      />

      <KpiCard
        title="Active Users"
        value={activeUsers}
        subtitle="Currently active accounts"
        icon={UserCheck}
        iconBg="#DCFCE7"
        iconColor="#16A34A"
      />

      <KpiCard
        title="Administrators"
        value={admins}
        subtitle="Admin & Super Admin"
        icon={Shield}
        iconBg="#F3E8FF"
        iconColor="#7C3AED"
      />

      <KpiCard
        title="Cashiers"
        value={cashiers}
        subtitle="Cash collection staff"
        icon={Wallet}
        iconBg="#FEF3C7"
        iconColor="#D97706"
      />
    </div>
  );
};

export default UserSummary;
