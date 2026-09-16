import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";

import USER_ROLE from "../../shared/enums/user-role";

import auditController from "./audit.controller";

const router = Router();

router.get(
  "/",

  authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),

  auditController.getAuditLogs,
);
export default router;
