import { Search } from "lucide-react";

type LoanToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;
};

const LoanToolbar = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: LoanToolbarProps) => {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* Search */}

      <div className="relative w-full lg:max-w-md">
        <Search
          size={18}
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search customer..."
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            py-2.5
            pl-10
            pr-4
            outline-none
            transition
            focus:border-blue-500
          "
        />
      </div>

      {/* Status */}

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-2.5
          outline-none
          focus:border-blue-500
        "
      >
        <option value="ALL">All Status</option>
        <option value="ACTIVE">Active</option>
        <option value="OVERDUE">Overdue</option>
        <option value="COMPLETED">Completed</option>
        <option value="PENDING">Pending</option>
      </select>
    </div>
  );
};

export default LoanToolbar;
