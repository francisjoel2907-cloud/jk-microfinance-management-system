import { UserRole } from "@prisma/client";

export interface RegisterPayload {
  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  password: string;

  role: UserRole;
}

export interface LoginPayload {
  email: string;

  password: string;
}

export interface AuthResponse {
  success: boolean;

  message: string;

  accessToken?: string;

  refreshToken?: string;
}
