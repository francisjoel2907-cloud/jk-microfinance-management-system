import { Mail } from "lucide-react";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthHeader } from "@/components/auth/AuthHeader";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { PasswordInput } from "@/components/common/PasswordInput";

import { Alert } from "@/components/common/Alert";

import { APP } from "@/constants/app";

import { useLoginForm } from "@/hooks/useLoginForm";

const LoginPage = () => {
  const { form, error, onSubmit } = useLoginForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <AuthLayout>
      <AuthCard size="md">
        <AuthHeader title={APP.NAME} subtitle={APP.DESCRIPTION} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter email"
            leftIcon={<Mail size={20} />}
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter password"
            error={errors.password?.message}
            {...register("password")}
          />

          {error && <Alert variant="error">{error}</Alert>}

          <Button
            type="submit"
            fullWidth
            loading={isSubmitting}
            className="rounded-2xl bg-green-600 hover:bg-green-700"
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Need an account? Contact your Super Admin.
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
