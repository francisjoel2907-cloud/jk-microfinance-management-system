import { Route } from "react-router-dom";

import DashboardPage from "@/pages/dashboard/DashboardPage";
import CustomersPage from "@/pages/customers/CustomersPage";
import LoansPage from "@/pages/loans/LoansPage";
import PaymentsPage from "@/pages/payments/PaymentsPage";
import ReportsPage from "@/pages/reports/ReportsPage";
import UsersPage from "@/pages/users/UsersPage";
import SettingsPage from "@/pages/settings/SettingsPage";

import ProtectedLayout from "./ProtectedLayout";

export const dashboardRoutes = (
  <>
    <Route
      path="/dashboard"
      element={
        <ProtectedLayout>
          <DashboardPage />
        </ProtectedLayout>
      }
    />

    <Route
      path="/customers"
      element={
        <ProtectedLayout>
          <CustomersPage />
        </ProtectedLayout>
      }
    />

    <Route
      path="/loans"
      element={
        <ProtectedLayout>
          <LoansPage />
        </ProtectedLayout>
      }
    />

    <Route
      path="/payments"
      element={
        <ProtectedLayout>
          <PaymentsPage />
        </ProtectedLayout>
      }
    />

    <Route
      path="/reports"
      element={
        <ProtectedLayout>
          <ReportsPage />
        </ProtectedLayout>
      }
    />

    <Route
      path="/users"
      element={
        <ProtectedLayout>
          <UsersPage />
        </ProtectedLayout>
      }
    />

    <Route
      path="/settings"
      element={
        <ProtectedLayout>
          <SettingsPage />
        </ProtectedLayout>
      }
    />
  </>
);
