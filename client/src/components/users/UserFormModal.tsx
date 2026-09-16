import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/common/Input";
import { PasswordInput } from "@/components/common/PasswordInput";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";

import {
  USER_ROLES,
  type User,
  type CreateUserPayload,
} from "@/types/user.types";

type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: CreateUserPayload["role"];
  password?: string;
};

type Props = {
  open: boolean;
  editingUser: User | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
};

const roleOptions = [
  { label: "Administrator", value: USER_ROLES.ADMIN },
  { label: "Accountant", value: USER_ROLES.ACCOUNTANT },
  { label: "Cashier", value: USER_ROLES.CASHIER },
];

const UserFormModal = ({
  open,
  editingUser,
  loading,
  onClose,
  onSubmit,
}: Props) => {
  const isEditing = Boolean(editingUser);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      role: USER_ROLES.CASHIER,
    },
  });

  useEffect(() => {
    if (editingUser) {
      reset({
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        email: editingUser.email,
        phone: editingUser.phone,
        password: "",
        role: editingUser.role,
      });
    } else {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        role: USER_ROLES.CASHIER,
      });
    }
  }, [editingUser, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            {isEditing ? "Edit Staff" : "Create Staff"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {isEditing
              ? "Update employee information."
              : "Create a new employee account."}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="First Name"
              error={errors.firstName?.message}
              {...register("firstName", { required: true })}
            />

            <Input
              label="Last Name"
              error={errors.lastName?.message}
              {...register("lastName", { required: true })}
            />
          </div>

          <Input
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email", { required: true })}
          />

          <Input
            label="Phone"
            error={errors.phone?.message}
            {...register("phone", { required: true })}
          />

          <Select
            label="Role"
            options={roleOptions}
            value={watch("role")}
            onChange={(e) =>
              setValue("role", e.target.value as UserFormData["role"])
            }
          />

          {!isEditing && (
            <PasswordInput
              id="password"
              label="Temporary Password"
              placeholder="Enter password"
              error={errors.password?.message}
              {...register("password", { required: true })}
            />
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="submit"
              loading={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isEditing ? "Save Changes" : "Create User"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
