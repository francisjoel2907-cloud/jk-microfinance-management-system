import type { LoanDetails as LoanDetailsType } from "@/types/loan.types";

import StatusBadge from "@/components/common/StatusBadge";

import { formatCurrency } from "@/utils/currency";

type LoanDetailsProps = {
  loan: LoanDetailsType;
};

const LoanDetails = ({ loan }: LoanDetailsProps) => {
  return (
    <div className="space-y-8">
      {/* Customer Information */}

      <section>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Customer Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <DetailItem
            label="Customer Name"
            value={`${loan.customer.firstName} ${loan.customer.lastName}`}
          />

          <DetailItem label="Phone Number" value={loan.customer.phone} />
        </div>
      </section>

      {/* Loan Officer Information */}

      <section>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Loan Officer Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <DetailItem
            label="Officer Name"
            value={`${loan.loanOfficer.firstName} ${loan.loanOfficer.lastName}`}
          />

          <DetailItem label="Phone Number" value={loan.loanOfficer.phone} />

          <DetailItem label="Email" value={loan.loanOfficer.email} />

          <DetailItem label="Role" value={loan.loanOfficer.role} />
        </div>
      </section>

      {/* Loan Information */}

      <section>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Loan Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <DetailItem
            label="Principal Amount"
            value={formatCurrency(loan.principalAmount)}
          />

          <DetailItem label="Interest Rate" value={`${loan.interestRate}%`} />

          <DetailItem
            label="Total Loan"
            value={formatCurrency(loan.totalAmount)}
          />

          <DetailItem
            label="Paid Amount"
            value={formatCurrency(loan.paidAmount)}
          />

          <DetailItem
            label="Remaining Amount"
            value={formatCurrency(loan.remainingAmount)}
          />

          <DetailItem
            label="Duration"
            value={`${loan.durationMonths} Months`}
          />

          <DetailItem
            label="Issue Date"
            value={new Date(loan.issuedDate).toLocaleDateString()}
          />

          <DetailItem
            label="Due Date"
            value={new Date(loan.dueDate).toLocaleDateString()}
          />

          <div>
            <p className="text-sm text-slate-500">Status</p>

            <div className="mt-1">
              <StatusBadge status={loan.status} />
            </div>
          </div>
        </div>
      </section>

      {/* Loan Summary */}

      <section>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Loan Summary
        </h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <DetailItem
            label="Penalties"
            value={formatCurrency(loan.summary.totalPenalties)}
          />

          <DetailItem
            label="Total Due"
            value={formatCurrency(loan.summary.totalDueAmount)}
          />

          <DetailItem
            label="Remaining Balance"
            value={formatCurrency(loan.summary.remainingAmount)}
          />
        </div>
      </section>

      {/* Installment Information */}

      <section>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Installment Information
        </h3>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  #
                </th>

                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Amount
                </th>

                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Paid
                </th>

                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Penalty
                </th>

                <th className="px-4 py-3 text-center font-semibold text-slate-700">
                  Due Date
                </th>

                <th className="px-4 py-3 text-center font-semibold text-slate-700">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {loan.installments.map((installment) => (
                <tr key={installment.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">{installment.installmentNumber}</td>

                  <td className="px-4 py-3 text-right font-medium">
                    {formatCurrency(installment.amount)}
                  </td>

                  <td className="px-4 py-3 text-right text-green-600">
                    {formatCurrency(installment.paidAmount)}
                  </td>

                  <td className="px-4 py-3 text-right text-red-600">
                    {formatCurrency(installment.penaltyAmount)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {new Date(installment.dueDate).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={installment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Payment History */}

      <section>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Payment History
        </h3>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Date
                </th>

                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Amount
                </th>

                <th className="px-4 py-3 text-center font-semibold text-slate-700">
                  Method
                </th>

                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Reference
                </th>

                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Notes
                </th>
              </tr>
            </thead>

            <tbody>
              {loan.payments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    No payments recorded.
                  </td>
                </tr>
              ) : (
                loan.payments.map((payment) => (
                  <tr key={payment.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 text-right font-semibold text-green-600">
                      {formatCurrency(payment.amount)}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {payment.paymentMethod}
                    </td>

                    <td className="px-4 py-3">
                      {payment.referenceNumber || "-"}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {payment.notes || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

type DetailItemProps = {
  label: string;
  value: string | number;
};

const DetailItem = ({ label, value }: DetailItemProps) => (
  <div>
    <p className="text-sm text-slate-500">{label}</p>

    <p className="mt-1 font-semibold text-slate-900">{value}</p>
  </div>
);

export default LoanDetails;
