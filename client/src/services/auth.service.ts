import { loginUser, registerUser, getCurrentUser } from "@/api/auth.api";

import type {
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
  User,
} from "@/types/auth.types";

import {
  saveTokens,
  clearTokens,
  getAccessToken,
} from "@/services/token.service";

/**
 * Login user
 */
export const login = async (payload: LoginPayload): Promise<User> => {
  const response = await loginUser(payload);

  saveTokens(response.accessToken, response.refreshToken);

  const currentUser = await getCurrentUser();

  return currentUser;
};

/**
 * Register user
 */
export const register = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  return await registerUser(payload);
};

/**
 * Get authenticated user
 */
export const getAuthenticatedUser = async (): Promise<User> => {
  return await getCurrentUser();
};

/**
 * Logout user
 */
export const logout = (): void => {
  clearTokens();
};

/**
 * Check authentication
 */
export const hasAccessToken = (): boolean => {
  return !!getAccessToken();
};

export const initializeAuth = async () => {
  if (!hasAccessToken()) {
    return null;
  }

  try {
    const user = await getAuthenticatedUser();

    return user;
  } catch {
    logout();

    return null;
  }
};
