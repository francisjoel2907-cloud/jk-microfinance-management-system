import { Search } from "lucide-react";
import type { PaymentPeriod } from "@/types/payment.types";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  period: PaymentPeriod;
  setPeriod: (value: PaymentPeriod) => void;

  startDate: string;
  endDate: string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
};

const PaymentFilters = ({
  search,
  setSearch,
  period,
  setPeriod,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: Props) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer or phone..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-green-500"
          />
        </div>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as PaymentPeriod)}
          className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
          <option value="custom">Custom</option>
        </select>

        {period === "custom" && (
          <div className="flex gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentFilters;
