import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";

import { useAuth } from "@/hooks/useAuth";

import { ROUTES } from "@/constants/routes";

type GuestRouteProps = {
  children: ReactNode;
};

const GuestRoute = ({ children }: GuestRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;
