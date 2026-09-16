import type { Customer } from "@/types/customer.types";

type CustomerDetailsProps = {
  customer: Customer;
};

const CustomerDetails = ({ customer }: CustomerDetailsProps) => {
  const Item = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <div className="space-y-1">
      <p className="text-sm font-medium text-slate-500">{label}</p>

      <p className="text-slate-900">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <Item
        label="Full Name"
        value={`${customer.firstName} ${customer.lastName}`}
      />

      <Item label="Phone Number" value={customer.phone} />

      <Item label="Email" value={customer.email || "-"} />

      <Item label="National ID" value={customer.nationalId} />

      <Item label="Address" value={customer.address} />

      <Item
        label="Status"
        value={
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              customer.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {customer.isActive ? "Active" : "Inactive"}
          </span>
        }
      />

      <Item
        label="Registered"
        value={new Date(customer.createdAt).toLocaleDateString()}
      />
    </div>
  );
};

export default CustomerDetails;
