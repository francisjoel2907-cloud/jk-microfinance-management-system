import { useState } from "react";
import type { ReportPeriod } from "@/types/report.types";
import DashboardLayout from "@/layouts/DashboardLayout";

import { FileBarChart, Download } from "lucide-react";

import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { PageSection } from "@/components/common/PageSection";

import { useReport } from "@/hooks/useReport";
import { usePaymentReport } from "@/hooks/useReport";
import PaymentReportTable from "@/components/reports/PaymentReportTable";
import { generateCollectionReportPDF } from "@/utils/pdf/report.pdf";
import { Button } from "@/components/common/Button";
import ReportFilters from "@/components/reports/ReportFilters";

const ReportsPage = () => {
  const [period, setPeriod] = useState<ReportPeriod>("month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading, error } = useReport(period, startDate, endDate);

  const { data: payments = [] } = usePaymentReport(period, startDate, endDate);

  if (isLoading) {
    return (
      <DashboardLayout>
        <PageContainer>
          <p className="text-slate-500">Loading reports...</p>
        </PageContainer>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <PageContainer>
          <p className="text-red-600">Failed to load reports.</p>
        </PageContainer>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader
          title="Reports & Analytics"
          subtitle="Collection report overview"
          action={
            <Button
              onClick={() => generateCollectionReportPDF(data!, payments)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Download size={18} />
              Export PDF
            </Button>
          }
        />

        <PageSection>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-blue-100 p-3">
                <FileBarChart className="text-blue-600" size={28} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Collection Report
                </h2>

                <p className="text-sm text-slate-500">
                  Financial summary from all recorded payments
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Total Collected
                </p>
                <h3 className="mt-2 text-2xl font-bold text-green-600">
                  TSh {Number(data?.totalCollected ?? 0).toLocaleString()}
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Today
                </p>
                <h3 className="mt-2 text-2xl font-bold text-blue-600">
                  TSh {Number(data?.todayCollections ?? 0).toLocaleString()}
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  This Month
                </p>
                <h3 className="mt-2 text-2xl font-bold text-violet-600">
                  TSh {Number(data?.monthlyCollections ?? 0).toLocaleString()}
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Payments
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {data?.paymentsCount ?? 0}
                </h3>
              </div>
            </div>
          </div>
        </PageSection>
        <PageSection>
          <ReportFilters
            period={period}
            setPeriod={setPeriod}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </PageSection>
        <PageSection>
          <PaymentReportTable payments={payments} />
        </PageSection>
      </PageContainer>
    </DashboardLayout>
  );
};

export default ReportsPage;
