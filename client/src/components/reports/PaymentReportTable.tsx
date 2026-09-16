import { useState } from "react";
import { Search } from "lucide-react";

import { formatCurrency } from "@/utils/currency";
import type { PaymentReport } from "@/types/report.types";

type Props = {
  payments: PaymentReport[];
};

const PaymentReportTable = ({ payments }: Props) => {
  const [search, setSearch] = useState("");

  const filtered = payments.filter((payment) => {
    const query = search.toLowerCase();

    return (
      payment.customerName.toLowerCase().includes(query) ||
      payment.phone.includes(query) ||
      payment.paymentMethod.toLowerCase().includes(query) ||
      payment.processedBy.toLowerCase().includes(query)
    );
  });

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Payment Report
            </h3>
            <p className="text-sm text-slate-500">
              Search and review all recorded payments
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-3 outline-none focus:border-green-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Method</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-left">Officer</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((payment) => (
              <tr
                key={payment.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="px-4 py-3 font-medium text-slate-800">
                  {payment.customerName}
                </td>

                <td className="px-4 py-3 text-slate-600">{payment.phone}</td>

                <td className="px-4 py-3 text-right font-semibold text-green-600">
                  {formatCurrency(payment.amount)}
                </td>

                <td className="px-4 py-3 text-center">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    {payment.paymentMethod}
                  </span>
                </td>

                <td className="px-4 py-3 text-center text-slate-600">
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-slate-700">
                  {payment.processedBy}
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentReportTable;
