import { Routes, Route, Navigate } from "react-router-dom";

import { authRoutes } from "./auth.routes";
import { dashboardRoutes } from "./dashboard.routes";

const AppRoutes = () => {
  return (
    <Routes>
      {authRoutes}

      {dashboardRoutes}

      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
