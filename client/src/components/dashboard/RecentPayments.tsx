import { Calendar, Banknote } from "lucide-react";

type Payment = {
  id: string;
  customerName: string;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
};

type Props = {
  payments: Payment[];
};

const RecentPayments = ({ payments }: Props) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Recent Payments
        </h3>
        <p className="text-sm text-slate-500">Latest 5 recorded transactions</p>
      </div>

      <div className="space-y-3">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="rounded-xl border border-slate-100 p-3 hover:bg-slate-50"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-slate-800">
                {payment.customerName}
              </h4>

              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <Banknote size={16} />
                {Number(payment.amount).toLocaleString()}
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(payment.paymentDate).toLocaleDateString("en-GB")}
              </div>

              <span className="rounded-full bg-slate-100 px-2 py-1">
                {payment.paymentMethod.replace("_", " ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPayments;
