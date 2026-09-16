import { createContext, useReducer, useCallback } from "react";

import type { ReactNode } from "react";

import {
  login as loginService,
  logout as logoutService,
} from "@/services/auth.service";

import type { User, LoginPayload, AuthContextType } from "@/types/auth.types";

import { authReducer, initialAuthState } from "@/reducers/auth.reducer";

import { ROUTES } from "@/constants/routes";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = useCallback(async (payload: LoginPayload) => {
    const currentUser = await loginService(payload);

    dispatch({
      type: "LOGIN",
      payload: currentUser,
    });
  }, []);

  const initialize = useCallback((user: User | null) => {
    dispatch({
      type: "INITIALIZE",
      payload: user,
    });
  }, []);

  const logout = useCallback(() => {
    logoutService();

    dispatch({
      type: "LOGOUT",
    });

    window.location.href = ROUTES.LOGIN;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,

        isAuthenticated: !!state.user,

        isLoading: state.isLoading,

        login,

        logout,

        initialize,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
