import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";

import { notify } from "@/utils/notify";

import { registerSchema, type RegisterFormData } from "@/schemas/auth.schema";

import { register as registerService } from "@/services/auth.service";

import { ROUTES } from "@/constants/routes";

import { getErrorMessage } from "@/utils/error";

import { USER_ROLES } from "@/types/user.types";

export function useRegisterForm() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: USER_ROLES.CASHIER,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError("");

      const { confirmPassword, ...payload } = data;

      await registerService(payload);

      notify.success("Registration successful");

      navigate(ROUTES.LOGIN);
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
