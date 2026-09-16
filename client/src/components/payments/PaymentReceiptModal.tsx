import { Button } from "@/components/common/Button";
import { formatCurrency } from "@/utils/currency";

import type { PaymentReceipt } from "@/types/paymentReceipt.types";

type PaymentReceiptProps = {
  receipt: PaymentReceipt;
  onClose: () => void;
};

const PaymentReceiptModal = ({ receipt, onClose }: PaymentReceiptProps) => {
  return (
    <div className="space-y-6">
      {/* Receipt */}
      <div
        id="payment-receipt"
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        {/* Header */}
        <div className="border-b border-slate-200 pb-5 text-center">
          <h2 className="text-2xl font-bold tracking-wide text-slate-900">
            PAYMENT RECEIPT
          </h2>

          <p className="mt-1 text-sm text-slate-500">Payment confirmation</p>
        </div>

        {/* Receipt Number */}
        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              Receipt Number
            </span>

            <span className="font-semibold text-slate-900">
              {receipt.receiptNumber}
            </span>
          </div>
        </div>

        {/* Payment Information */}
        <div className="mt-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Payment Information
          </h3>

          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Payment ID</span>

              <span className="max-w-[220px] truncate font-medium text-slate-900">
                {receipt.paymentId}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Loan ID</span>

              <span className="max-w-[220px] truncate font-medium text-slate-900">
                {receipt.loanId}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Payment Date</span>

              <span className="font-medium text-slate-900">
                {new Date(receipt.paymentDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Payment Method</span>

              <span className="font-medium text-slate-900">
                {receipt.paymentMethod}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Reference Number</span>

              <span className="font-medium text-slate-900">
                {receipt.referenceNumber || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Amount Paid</span>

            <span className="text-2xl font-bold text-green-600">
              {formatCurrency(receipt.amount)}
            </span>
          </div>
        </div>

        {/* Processed By */}
        <div className="mt-6 border-t border-slate-200 pt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Processed By</span>

            <span className="font-medium text-slate-900">
              {receipt.processedById}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-slate-200 pt-5 text-center">
          <p className="text-xs text-slate-400">Thank you for your payment.</p>
        </div>
      </div>

      {/* Actions */}
      <div className="no-print flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.print()}
        >
          Print
        </Button>

        <Button
          type="button"
          className="bg-green-600 hover:bg-green-700"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default PaymentReceiptModal;
