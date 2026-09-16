import type { Customer } from "@/types/customer.types";

import CustomerActions from "./CustomerAction";

type CustomerTableProps = {
  customers: Customer[];

  onView: (customer: Customer) => void;

  onEdit: (customer: Customer) => void;

  onStatement: (customer: Customer) => void;
};

const CustomerTable = ({
  customers,
  onView,
  onEdit,
  onStatement,
}: CustomerTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
              No.
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
              Customer
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
              Phone
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
              Email
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
              National ID
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
              Status
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
              Registered
            </th>

            <th className="px-5 py-4 text-right text-sm font-semibold text-slate-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer, index) => (
            <tr
              key={customer.id}
              className="border-b border-slate-100 hover:bg-slate-50 transition"
            >
              {/* Customer */}
              <td className="px-5 py-4 font-semibold text-slate-500">
                {index + 1}
              </td>

              <td className="px-5 py-4">
                <div className="font-semibold text-slate-900">
                  {customer.firstName} {customer.lastName}
                </div>
              </td>

              {/* Phone */}
              <td className="px-5 py-4 text-slate-600">{customer.phone}</td>

              {/* Email */}
              <td className="px-5 py-4 text-slate-600">
                {customer.email ?? "-"}
              </td>

              {/* National ID */}
              <td className="px-5 py-4 text-slate-600">
                {customer.nationalId}
              </td>

              {/* Status */}
              <td className="px-5 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    customer.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {customer.isActive ? "Active" : "Inactive"}
                </span>
              </td>

              {/* Registered */}
              <td className="px-5 py-4 text-slate-600">
                {new Date(customer.createdAt).toLocaleDateString()}
              </td>

              {/* Actions */}
              <td className="px-5 py-4 text-center">
                <CustomerActions
                  onView={() => onView(customer)}
                  onEdit={() => onEdit(customer)}
                  onStatement={() => onStatement(customer)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
