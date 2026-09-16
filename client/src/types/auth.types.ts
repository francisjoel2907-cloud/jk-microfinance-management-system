// ==========================================
// User Role
// ==========================================

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "ACCOUNTANT" | "CASHIER";

// ==========================================
// User
// ==========================================

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
}

// ==========================================
// Login
// ==========================================

export interface LoginPayload {
  email: string;
  password: string;
}

// ==========================================
// Register
// ==========================================

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  password: string;
}

// ==========================================
// Login Response
// ==========================================

export interface LoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

// ==========================================
// Register Response
// ==========================================

export interface RegisterResponse {
  success: boolean;
  message: string;
}

// ==========================================
// Auth Context
// ==========================================

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (payload: LoginPayload) => Promise<void>;

  logout: () => void;

  initialize: (user: User | null) => void;
}
