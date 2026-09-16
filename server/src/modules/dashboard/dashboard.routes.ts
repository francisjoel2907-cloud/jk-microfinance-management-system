import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";

import USER_ROLE from "../../shared/enums/user-role";

import dashboardController from "./dashboard.controller";

const router = Router();

router.get(
  "/statistics",

  authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.ACCOUNTANT),

  dashboardController.getDashboardStatistics,
);

export default router;
