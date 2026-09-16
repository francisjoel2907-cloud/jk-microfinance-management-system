import StatusBadge from "../common/StatusBadge";
import { Eye, Wallet } from "lucide-react";
import { formatCurrency } from "@/utils/currency";
import type { Loan } from "@/types/loan.types";

type LoansTableProps = {
  loans: Loan[];

  onView: (loan: Loan) => void;

  onPayment: (loan: Loan) => void;
};

const LoansTable = ({ loans, onView, onPayment }: LoansTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Phone
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                Principal
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                Paid
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                Remaining
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                Due Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loans.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-slate-500">
                  No loans found.
                </td>
              </tr>
            ) : (
              loans.map((loan, index) => (
                <tr
                  key={loan.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">
                      {loan.customer.firstName} {loan.customer.lastName}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {loan.customer.phone}
                  </td>

                  <td className="px-6 py-4 text-right font-medium">
                    {formatCurrency(loan.principalAmount)}
                  </td>

                  <td className="px-6 py-4 text-right font-medium text-green-600">
                    {formatCurrency(loan.paidAmount)}
                  </td>

                  <td className="px-6 py-4 text-right font-medium text-red-600">
                    {formatCurrency(loan.remainingAmount)}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {new Date(loan.dueDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={loan.status} />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        title="View Loan"
                        onClick={() => onView(loan)}
                        className="
    rounded-lg
    p-2
    text-blue-600
    transition
    hover:bg-blue-50
  "
                      >
                        <Eye size={18} />
                      </button>

                      {loan.status !== "COMPLETED" && (
                        <button
                          type="button"
                          title="Make Payment"
                          onClick={() => onPayment(loan)}
                          className="
      rounded-lg
      p-2
      text-green-600
      transition
      hover:bg-green-50
    "
                        >
                          <Wallet size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoansTable;
