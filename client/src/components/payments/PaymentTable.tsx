import { Eye, Receipt } from "lucide-react";

import { formatCurrency } from "@/utils/currency";

import type { PaymentHistory } from "@/types/payment.types";

type Props = {
  payments: PaymentHistory[];
  onViewReceipt?: (payment: PaymentHistory) => void;
};

const PaymentTable = ({ payments, onViewReceipt }: Props) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Payment History
        </h2>
        <p className="text-sm text-slate-500">All recorded customer payments</p>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-slate-600">
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Method</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Processed By</th>
              <th className="px-6 py-3 font-medium text-center">Receipt</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-slate-900">
                      {payment.customerName}
                    </p>
                    <p className="text-xs text-slate-500">{payment.phone}</p>
                  </div>
                </td>

                <td className="px-6 py-4 font-semibold text-green-600">
                  {formatCurrency(payment.amount)}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                    {payment.paymentMethod.replace("_", " ")}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">{payment.processedBy}</td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onViewReceipt?.(payment)}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-green-100 hover:text-green-600"
                  >
                    <Receipt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet Cards */}
      <div className="space-y-3 p-4 lg:hidden">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="rounded-2xl border border-slate-100 p-4"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  {payment.customerName}
                </h3>
                <p className="text-xs text-slate-500">{payment.phone}</p>
              </div>

              <button
                onClick={() => onViewReceipt?.(payment)}
                className="rounded-lg bg-green-50 p-2 text-green-600"
              >
                <Eye size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-slate-500">Amount</p>
                <p className="font-semibold text-green-600">
                  {formatCurrency(payment.amount)}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Method</p>
                <p>{payment.paymentMethod.replace("_", " ")}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Date</p>
                <p>{new Date(payment.paymentDate).toLocaleDateString()}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Officer</p>
                <p>{payment.processedBy}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {payments.length === 0 && (
        <div className="p-8 text-center text-slate-500">
          No payments found for the selected period.
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
