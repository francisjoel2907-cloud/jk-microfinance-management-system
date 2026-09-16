import { useMemo, useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { PageSection } from "@/components/common/PageSection";
import { Button } from "@/components/common/Button";

import UserSummary from "@/components/users/UserSummary";
import UserFilters from "@/components/users/UserFilters";
import UserTable from "@/components/users/UserTable";
import UserFormModal from "@/components/users/UserFormModal";

import { useUsers } from "@/hooks/useUsers";
import { useUserMutations } from "@/hooks/useUserMutations";

import { USER_ROLES, type User, type UserRole } from "@/types/user.types";

type StatusFilter = "ALL" | "ACTIVE" | "INACTIVE";

const UsersPage = () => {
  const { data: users = [], isLoading, error } = useUsers();

  const { create, update, toggle } = useUserMutations();

  const [search, setSearch] = useState("");
  const [role, setRole] = useState<UserRole | "ALL">("ALL");
  const [status, setStatus] = useState<StatusFilter>("ALL");

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        user.firstName.toLowerCase().includes(keyword) ||
        user.lastName.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.phone.includes(search);

      const matchesRole = role === "ALL" || user.role === role;

      const matchesStatus =
        status === "ALL" ||
        (status === "ACTIVE" && user.isActive) ||
        (status === "INACTIVE" && !user.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, role, status]);

  const summary = useMemo(() => {
    return {
      totalUsers: users.length,

      activeUsers: users.filter((u) => u.isActive).length,

      admins: users.filter(
        (u) => u.role === USER_ROLES.ADMIN || u.role === USER_ROLES.SUPER_ADMIN,
      ).length,

      cashiers: users.filter((u) => u.role === USER_ROLES.CASHIER).length,
    };
  }, [users]);

  const handleCreate = () => {
    setEditingUser(null);
    setOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleSubmit = async (data: any) => {
    if (editingUser) {
      await update.mutateAsync({
        id: editingUser.id,
        data,
      });
    } else {
      await create.mutateAsync(data);
    }

    setOpen(false);
  };

  const handleToggleStatus = async (user: User) => {
    await toggle.mutateAsync(user.id);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <PageContainer>
          <p className="text-slate-500">Loading users...</p>
        </PageContainer>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <PageContainer>
          <p className="text-red-600">Failed to load users.</p>
        </PageContainer>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader
          title="Users & Roles"
          subtitle="Manage employees and system access"
          action={
            <Button
              onClick={handleCreate}
              className="bg-green-600 hover:bg-green-700"
            >
              Create Staff
            </Button>
          }
        />

        <PageSection>
          <UserSummary {...summary} />
        </PageSection>

        <PageSection>
          <UserFilters
            search={search}
            setSearch={setSearch}
            role={role}
            setRole={setRole}
            status={status}
            setStatus={setStatus}
          />
        </PageSection>

        <PageSection>
          <UserTable
            users={filteredUsers}
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
          />
        </PageSection>

        <UserFormModal
          open={open}
          editingUser={editingUser}
          loading={create.isPending || update.isPending}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      </PageContainer>
    </DashboardLayout>
  );
};

export default UsersPage;
