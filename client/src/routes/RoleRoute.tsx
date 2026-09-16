import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";

import { useAuth } from "@/hooks/useAuth";

import { ROUTES } from "@/constants/routes";

import type { UserRole } from "@/types/auth.types";

type RoleRouteProps = {
  children: ReactNode;

  allowedRoles: UserRole[];
};

const RoleRoute = ({ children, allowedRoles }: RoleRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;
