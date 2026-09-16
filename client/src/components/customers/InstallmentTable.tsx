import { formatCurrency } from "@/utils/currency";

type Installment = {
  id: string;
  installmentNumber: number;
  amount: number;
  paidAmount: number;
  penaltyAmount: number;
  dueDate: string;
  paidDate: string | null;
  status: string;
};

type InstallmentTableProps = {
  installments: Installment[];
};

const InstallmentTable = ({ installments }: InstallmentTableProps) => {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full border border-slate-200 rounded-xl overflow-hidden">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              #
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Due Date
            </th>

            <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
              Amount
            </th>

            <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
              Paid
            </th>

            <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
              Penalty
            </th>

            <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {installments.map((installment) => (
            <tr key={installment.id} className="border-t border-slate-200">
              <td className="px-4 py-3">{installment.installmentNumber}</td>

              <td className="px-4 py-3">
                {new Date(installment.dueDate).toLocaleDateString()}
              </td>

              <td className="px-4 py-3 text-right">
                {formatCurrency(installment.amount)}
              </td>

              <td className="px-4 py-3 text-right">
                {formatCurrency(installment.paidAmount)}
              </td>

              <td className="px-4 py-3 text-right">
                {formatCurrency(installment.penaltyAmount)}
              </td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${
                      installment.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : installment.status === "OVERDUE"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {installment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstallmentTable;
