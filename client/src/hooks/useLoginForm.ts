import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";

import { notify } from "@/utils/notify";

import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";

import { useAuth } from "@/hooks/useAuth";

import { ROUTES } from "@/constants/routes";

import { getErrorMessage } from "@/utils/error";

export function useLoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [error, setError] = useState("");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");

      await login(data);

      notify.success("Login successful");

      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      const message = getErrorMessage(err);

      setError(message);

      notify.error(message);
    }
  };

  return {
    form,
    error,
    onSubmit,
  };
}
