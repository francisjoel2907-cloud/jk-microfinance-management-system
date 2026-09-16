// ==========================================
// API Configuration
// ==========================================

export const API = {
  BASE_URL: import.meta.env.VITE_API_URL,

  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",

      REGISTER: "/auth/register",

      ME: "/auth/me",

      REFRESH_TOKEN: "/auth/refresh-token",

      LOGOUT: "/auth/logout",
    },

    USERS: "/users",

    CUSTOMERS: "/customers",

    LOANS: "/loans",

    PAYMENTS: "/payments",

    DASHBOARD: "/dashboard",
  },
} as const;
