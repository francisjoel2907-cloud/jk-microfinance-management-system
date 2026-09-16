import { Search, Filter } from "lucide-react";

import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";

import { USER_ROLES, type UserRole } from "@/types/user.types";

type StatusFilter = "ALL" | "ACTIVE" | "INACTIVE";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  role: UserRole | "ALL";
  setRole: (value: UserRole | "ALL") => void;

  status: StatusFilter;
  setStatus: (value: StatusFilter) => void;
};

const roleOptions = [
  { label: "All Roles", value: "ALL" },
  { label: "Super Admin", value: USER_ROLES.SUPER_ADMIN },
  { label: "Administrator", value: USER_ROLES.ADMIN },
  { label: "Accountant", value: USER_ROLES.ACCOUNTANT },
  { label: "Cashier", value: USER_ROLES.CASHIER },
];

const statusOptions = [
  { label: "All Status", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

const UserFilters = ({
  search,
  setSearch,
  role,
  setRole,
  status,
  setStatus,
}: Props) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Filter size={18} className="text-slate-600" />
        <h3 className="font-semibold text-slate-900">Filter Staff</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          placeholder="Search name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={18} />}
        />

        <Select
          options={roleOptions}
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole | "ALL")}
        />

        <Select
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusFilter)}
        />
      </div>
    </div>
  );
};

export default UserFilters;
