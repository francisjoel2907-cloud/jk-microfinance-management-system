import { User, Mail, Phone } from "lucide-react";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";

import { APP } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import { useRegisterForm } from "@/hooks/useRegisterForm";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { PasswordInput } from "@/components/common/PasswordInput";
import { Alert } from "@/components/common/Alert";

import { Select } from "@/components/common/Select";
import { USER_ROLES } from "@/types/user.types";

const roleOptions = [
  {
    label: "Administrator",
    value: USER_ROLES.ADMIN,
  },
  {
    label: "Accountant",
    value: USER_ROLES.ACCOUNTANT,
  },
  {
    label: "Cashier",
    value: USER_ROLES.CASHIER,
  },
];

const RegisterPage = () => {
  const { form, error, onSubmit } = useRegisterForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title={`Create ${APP.NAME} Account`}
          subtitle="Register a new microfinance account"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First Name */}
          <Input
            label="First Name"
            placeholder="Enter first name"
            leftIcon={<User size={20} />}
            error={errors.firstName?.message}
            {...register("firstName")}
          />

          {/* Last Name */}
          <Input
            label="Last Name"
            placeholder="Enter last name"
            leftIcon={<User size={20} />}
            error={errors.lastName?.message}
            {...register("lastName")}
          />

          {/* Email */}
          <Input
            type="email"
            label="Email Address"
            placeholder="example@gmail.com"
            leftIcon={<Mail size={20} />}
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Phone */}
          <Input
            label="Phone Number"
            placeholder="255712345678"
            leftIcon={<Phone size={20} />}
            error={errors.phone?.message}
            {...register("phone")}
          />

          {/* Role */}
          <Select
            id="role"
            label="User Role"
            options={roleOptions}
            error={errors.role?.message}
            {...register("role")}
          />

          {/* Password */}
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter password"
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Confirm Password */}
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {error && <Alert variant="error">{error}</Alert>}

          <Button
            type="submit"
            fullWidth
            loading={isSubmitting}
            className="rounded-2xl bg-green-600 hover:bg-green-700"
          >
            Register
          </Button>
        </form>
        <AuthFooter
          question="Already have an account?"
          linkText="Login"
          linkTo={ROUTES.LOGIN}
        />
      </AuthCard>
    </AuthLayout>
  );
};
export default RegisterPage;
