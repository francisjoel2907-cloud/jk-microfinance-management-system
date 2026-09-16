import { useEffect } from "react";

import type { ReactNode } from "react";

import { initializeAuth } from "@/services/auth.service";

import { useAuth } from "@/hooks/useAuth";

type AuthInitializerProps = {
  children: ReactNode;
};

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const { initialize } = useAuth();

  useEffect(() => {
    const init = async () => {
      const user = await initializeAuth();

      initialize(user);
    };

    init();
  }, [initialize]);

  return <>{children}</>;
};
