import { Search } from "lucide-react";

type CustomerSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

const CustomerSearch = ({ value, onChange }: CustomerSearchProps) => {
  return (
    <div className="relative w-full md:max-w-md">
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
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, phone or National ID..."
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          py-3
          pl-10
          pr-4
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
      />
    </div>
  );
};

export default CustomerSearch;
