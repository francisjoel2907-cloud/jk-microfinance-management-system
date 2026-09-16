import type { ReactNode } from "react";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

type ProtectedLayoutProps = {
  children: ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <ProtectedRoute>
      <RoleRoute
        allowedRoles={["SUPER_ADMIN", "ADMIN", "ACCOUNTANT", "CASHIER"]}
      >
        {children}
      </RoleRoute>
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
