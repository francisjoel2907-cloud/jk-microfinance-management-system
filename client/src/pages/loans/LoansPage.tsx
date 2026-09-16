import { PageHeader } from "@/components/common/PageHeader";
import { PageSection } from "@/components/common/PageSection";
import { Plus } from "lucide-react";
import LoanStatistics from "@/components/loans/LoanStatistics";
import LoansTable from "@/components/loans/LoansTable";

import { useLoans } from "@/hooks/useLoans";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import LoanDetails from "@/components/loans/LoanDetails";

import type { Loan } from "@/types/loan.types";

import DashboardLayout from "@/layouts/DashboardLayout";

import { PageContainer } from "@/components/common/PageContainer";
import CreateLoanForm from "@/components/loans/CreateLoanForm";
import PaymentForm from "@/components/payments/PaymentForm";

import PaymentReceipt from "@/components/payments/PaymentReceiptModal";

import type { PaymentReceipt as PaymentReceiptType } from "@/types/paymentReceipt.types";
import { useLoanDetails } from "@/hooks/useLoanDetails";

const LoansPage = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);

  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [paymentOpen, setPaymentOpen] = useState(false);

  const [receiptOpen, setReceiptOpen] = useState(false);

  const [receipt, setReceipt] = useState<PaymentReceiptType | null>(null);

  const { data, isLoading, error } = useLoans();
  const {
    data: loanDetails,
    isLoading: loanDetailsLoading,
    error: loanDetailsError,
  } = useLoanDetails(selectedLoanId);

  if (isLoading) {
    return (
      <div className="py-10 text-center text-slate-500">Loading loans...</div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-500">
        Failed to load loans.
      </div>
    );
  }

  const statistics = data?.statistics;

  const loans = data?.loans ?? [];

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader
          title="Loans"
          subtitle="Manage and monitor all customer loans."
          action={
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setOpenCreateModal(true)}
            >
              <Plus size={18} />
              New Loan
            </Button>
          }
        />

        {statistics && (
          <LoanStatistics
            totalLoans={statistics.totalLoans}
            activeLoans={statistics.activeLoans}
            completedLoans={statistics.completedLoans}
            overdueLoans={statistics.overdueLoans}
            totalAmount={statistics.totalPortfolio}
          />
        )}

        <PageSection>
          <LoansTable
            loans={loans}
            onView={(loan) => {
              setSelectedLoanId(loan.id);
              setDetailsOpen(true);
            }}
            onPayment={(loan) => {
              setSelectedLoan(loan);
              setPaymentOpen(true);
            }}
          />
        </PageSection>
        <Modal
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          title="Create New Loan"
        >
          <CreateLoanForm
            onSuccess={() => setOpenCreateModal(false)}
            onCancel={() => setOpenCreateModal(false)}
          />
        </Modal>
        <Modal
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          title="Loan Details"
        >
          {loanDetailsLoading && (
            <div className="py-10 text-center text-slate-500">
              Loading loan details...
            </div>
          )}

          {loanDetailsError && (
            <div className="py-10 text-center text-red-500">
              Failed to load loan details.
            </div>
          )}

          {loanDetails && <LoanDetails loan={loanDetails} />}
        </Modal>
        <Modal
          open={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          title="Receive Loan Payment"
        >
          {selectedLoan && (
            <PaymentForm
              loanId={selectedLoan.id}
              onSuccess={(receipt) => {
                setPaymentOpen(false);

                setReceipt(receipt);

                setReceiptOpen(true);
              }}
              onCancel={() => setPaymentOpen(false)}
            />
          )}
        </Modal>
        <Modal
          open={receiptOpen}
          onClose={() => setReceiptOpen(false)}
          title="Payment Receipt"
        >
          {receipt && (
            <PaymentReceipt
              receipt={receipt}
              onClose={() => setReceiptOpen(false)}
            />
          )}
        </Modal>
      </PageContainer>
    </DashboardLayout>
  );
};

export default LoansPage;
