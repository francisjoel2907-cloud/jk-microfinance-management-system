import { Pencil, Power } from "lucide-react";

import type { User } from "@/types/user.types";
import RoleBadge from "./RoleBadge";

import { Button } from "@/components/common/Button";

type Props = {
  users: User[];
  onEdit: (user: User) => void;
  onToggleStatus: (user: User) => void;
};

const UserTable = ({ users, onEdit, onToggleStatus }: Props) => {
  if (users.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-slate-500">No users found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-slate-600">
              <th className="px-5 py-4 font-semibold">Employee</th>
              <th className="px-5 py-4 font-semibold">Role</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Phone</th>
              <th className="px-5 py-4 font-semibold">Created</th>
              <th className="px-5 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {user.firstName} {user.lastName}
                    </p>

                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <RoleBadge role={user.role} />
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-5 py-4 text-slate-700">{user.phone}</td>

                <td className="px-5 py-4 text-slate-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(user)}
                    >
                      <Pencil size={16} />
                    </Button>

                    <Button
                      size="sm"
                      color={user.isActive ? "danger" : "success"}
                      onClick={() => onToggleStatus(user)}
                    >
                      <Power size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
