import api from "@/lib/api";

import { API } from "@/constants/api";

import type {
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  RegisterResponse,
  User,
} from "@/types/auth.types";

import type { ApiResponse } from "@/types/api.types";

export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    API.ENDPOINTS.AUTH.LOGIN,
    payload,
  );

  return response.data;
};

export const registerUser = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    API.ENDPOINTS.AUTH.REGISTER,
    payload,
  );

  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<ApiResponse<User>>(API.ENDPOINTS.AUTH.ME);

  return response.data.data;
};
