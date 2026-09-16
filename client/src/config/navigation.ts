import {
  LayoutDashboard,
  Users,
  HandCoins,
  CreditCard,
  BarChart3,
  UserCog,
  Settings,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";

export type NavigationItem = {
  label: string;

  path: string;

  icon: typeof LayoutDashboard;

  roles?: string[];
};

export const navigation: NavigationItem[] = [
  {
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },

  {
    label: "Customers",
    path: ROUTES.CUSTOMERS,
    icon: Users,
  },

  {
    label: "Loans",
    path: ROUTES.LOANS,
    icon: HandCoins,
  },

  {
    label: "Payments",
    path: ROUTES.PAYMENTS,
    icon: CreditCard,
  },

  {
    label: "Reports",
    path: ROUTES.REPORTS,
    icon: BarChart3,
  },

  {
    label: "Users",
    path: ROUTES.USERS,
    icon: UserCog,
  },

  {
    label: "Settings",
    path: ROUTES.SETTINGS,
    icon: Settings,
  },
];
