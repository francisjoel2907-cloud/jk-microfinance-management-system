import DashboardLayout from "@/layouts/DashboardLayout";

import {
  Users,
  Wallet,
  Banknote,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Percent,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { PageSection } from "@/components/common/PageSection";

import { useDashboard } from "@/hooks/useDashboard";

import { Button } from "@/components/common/Button";

import KpiCard from "@/components/dashboard/KpiCard";

import MonthlyCollectionChart from "@/components/dashboard/MonthlyCollectionChart";
import PortfolioHealth from "@/components/dashboard/PortfolioHealth";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentPayments from "@/components/dashboard/RecentPayments";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  const { data: statistics, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <DashboardLayout>
        <PageContainer>
          <p className="text-slate-500">Loading dashboard...</p>
        </PageContainer>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <PageContainer>
          <p className="text-red-600">Failed to load dashboard statistics.</p>
        </PageContainer>
      </DashboardLayout>
    );
  }
  const today = new Date();

  const hour = today.getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader
          title={`${greeting}, ${user?.firstName} 👋`}
          subtitle={`${formattedDate} • ${user?.role}`}
          action={
            <Button onClick={logout} className="bg-red-600 hover:bg-red-700">
              Logout
            </Button>
          }
        />
        <PageSection>
          <PortfolioHealth
            collectionRate={statistics?.collectionRate ?? 0}
            overdueLoans={statistics?.overdueLoans ?? 0}
          />
        </PageSection>
        <PageSection>
          <QuickActions />
        </PageSection>

        <PageSection
          className="
    grid
    grid-cols-1
    gap-4
    sm:grid-cols-2
    lg:grid-cols-4
  "
        >
          <KpiCard
            title="Loan Portfolio"
            value={
              <>
                <p className="text-xs font-semibold text-slate-500">TSh</p>
                <h2 className="text-2xl font-bold text-slate-900">
                  {Number(statistics?.totalDisbursed ?? 0).toLocaleString()}
                </h2>
              </>
            }
            subtitle="Total money disbursed"
            icon={Wallet}
            iconBg="#DCFCE7"
            iconColor="#16A34A"
          />

          <KpiCard
            title="Collected"
            value={
              <>
                <p className="text-xs font-semibold text-slate-500">TSh</p>
                <h2 className="text-2xl font-bold text-slate-900">
                  {Number(statistics?.totalCollected ?? 0).toLocaleString()}
                </h2>
              </>
            }
            subtitle="Recovered from borrowers"
            icon={Banknote}
            iconBg="#DBEAFE"
            iconColor="#2563EB"
          />

          <KpiCard
            title="Outstanding"
            value={
              <>
                <p className="text-xs font-semibold text-slate-500">TSh</p>
                <h2 className="text-2xl font-bold text-slate-900">
                  {Number(
                    (statistics?.totalDisbursed ?? 0) -
                      (statistics?.totalCollected ?? 0),
                  ).toLocaleString()}
                </h2>
              </>
            }
            subtitle="Remaining loan balance"
            icon={AlertTriangle}
            iconBg="#FEE2E2"
            iconColor="#DC2626"
          />

          <KpiCard
            title="Collection Rate"
            value={`${Number(statistics?.collectionRate ?? 0).toFixed(1)}%`}
            subtitle="Portfolio performance"
            icon={Percent}
            iconBg="#F3E8FF"
            iconColor="#7C3AED"
          />

          <KpiCard
            title="Customers"
            value={statistics?.totalCustomers ?? 0}
            subtitle="Registered borrowers"
            icon={Users}
            iconBg="#ECFDF5"
            iconColor="#059669"
          />

          <KpiCard
            title="Active Loans"
            value={statistics?.activeLoans ?? 0}
            subtitle="Currently being repaid"
            icon={TrendingUp}
            iconBg="#D1FAE5"
            iconColor="#10B981"
          />

          <KpiCard
            title="Completed"
            value={statistics?.completedLoans ?? 0}
            subtitle="Successfully finished"
            icon={CheckCircle2}
            iconBg="#E0F2FE"
            iconColor="#0284C7"
          />

          <KpiCard
            title="Overdue"
            value={statistics?.overdueLoans ?? 0}
            subtitle="Require immediate follow-up"
            icon={AlertTriangle}
            iconBg="#FDE2E2"
            iconColor="#DC2626"
          />
        </PageSection>
        <PageSection>
          <MonthlyCollectionChart data={statistics?.monthlyCollections ?? []} />
        </PageSection>
        <PageSection>
          <RecentPayments payments={statistics?.recentPayments ?? []} />
        </PageSection>
      </PageContainer>
    </DashboardLayout>
  );
};

export default DashboardPage;
