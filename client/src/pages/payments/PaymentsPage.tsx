import { useMemo, useState } from "react";
import ReceiptModal from "@/components/payments/ReceiptModal";
import { usePaymentReceipt } from "@/hooks/usePaymentReceipt";

import DashboardLayout from "@/layouts/DashboardLayout";

import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { PageSection } from "@/components/common/PageSection";

import PaymentSummary from "@/components/payments/PaymentSummary";
import PaymentFilters from "@/components/payments/PaymentFilters";
import PaymentTable from "@/components/payments/PaymentTable";

import { usePayment } from "@/hooks/usePayment";

import type { PaymentHistory, PaymentPeriod } from "@/types/payment.types";

const PaymentsPage = () => {
  const [search, setSearch] = useState("");

  const [period, setPeriod] = useState<PaymentPeriod>("month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedPaymentId, setSelectedPaymentId] = useState("");
  const [receiptOpen, setReceiptOpen] = useState(false);

  const {
    data: payments = [],
    isLoading,
    error,
  } = usePayment({
    period,
    startDate,
    endDate,
  });

  const filteredPayments = useMemo(() => {
    const keyword = search.toLowerCase();

    return payments.filter(
      (payment) =>
        payment.customerName.toLowerCase().includes(keyword) ||
        payment.phone.includes(search),
    );
  }, [payments, search]);

  const summary = useMemo(() => {
    const totalCollected = filteredPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0,
    );

    const today = new Date().toDateString();

    const todayCollected = filteredPayments
      .filter(
        (payment) => new Date(payment.paymentDate).toDateString() === today,
      )
      .reduce((sum, payment) => sum + payment.amount, 0);

    const transactions = filteredPayments.length;

    const averagePayment = transactions > 0 ? totalCollected / transactions : 0;

    return {
      totalCollected,
      todayCollected,
      transactions,
      averagePayment,
    };
  }, [filteredPayments]);

  const { data: receipt } = usePaymentReceipt(selectedPaymentId, receiptOpen);

  const handleViewReceipt = (payment: PaymentHistory) => {
    setSelectedPaymentId(payment.id);
    setReceiptOpen(true);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <PageContainer>
          <p className="text-slate-500">Loading payments...</p>
        </PageContainer>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <PageContainer>
          <p className="text-red-600">Failed to load payments.</p>
        </PageContainer>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader
          title="Payments Management"
          subtitle="Track and manage all customer repayments"
        />

        <PageSection>
          <PaymentSummary
            totalCollected={summary.totalCollected}
            todayCollected={summary.todayCollected}
            transactions={summary.transactions}
            averagePayment={summary.averagePayment}
          />
        </PageSection>

        <PageSection>
          <PaymentFilters
            search={search}
            setSearch={setSearch}
            period={period}
            setPeriod={setPeriod}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </PageSection>

        <PageSection>
          <PaymentTable
            payments={filteredPayments}
            onViewReceipt={handleViewReceipt}
          />
        </PageSection>
        <ReceiptModal
          open={receiptOpen}
          onClose={() => {
            setReceiptOpen(false);
            setSelectedPaymentId("");
          }}
          receipt={receipt}
        />
      </PageContainer>
    </DashboardLayout>
  );
};

export default PaymentsPage;
