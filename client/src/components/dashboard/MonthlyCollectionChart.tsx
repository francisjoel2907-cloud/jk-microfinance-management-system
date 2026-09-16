import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { formatCurrency } from "@/utils/currency";

type MonthlyCollection = {
  month: string;
  total: number;
};

type Props = {
  data: MonthlyCollection[];
};

const MonthlyCollectionChart = ({ data }: Props) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Monthly Collections
        </h3>

        <p className="text-sm text-slate-500">
          Money collected from borrowers each month
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="month" tickLine={false} axisLine={false} />

            <YAxis
              tickFormatter={(value) => `${value / 1000000}M`}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              formatter={(value) => [
                formatCurrency(Number(value ?? 0)),
                "Collected",
              ]}
              cursor={{ fill: "#F1F5F9" }}
            />

            <Bar dataKey="total" radius={[8, 8, 0, 0]} fill="#16A34A" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyCollectionChart;
