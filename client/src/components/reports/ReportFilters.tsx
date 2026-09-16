import type { ReportPeriod } from "@/types/report.types";

type Props = {
  period: ReportPeriod;
  setPeriod: (value: ReportPeriod) => void;
  startDate: string;
  endDate: string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
};

const ReportFilters = ({
  period,
  setPeriod,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: Props) => {
  const periods: { label: string; value: ReportPeriod }[] = [
    { label: "Today", value: "today" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "Custom", value: "custom" },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        Report Filters
      </h3>

      <div className="flex flex-wrap gap-2">
        {periods.map((item) => (
          <button
            key={item.value}
            onClick={() => setPeriod(item.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              period === item.value
                ? "bg-green-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {period === "custom" && (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-slate-600">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-600">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportFilters;
