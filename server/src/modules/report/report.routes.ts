import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";

import USER_ROLE from "../../shared/enums/user-role";

import reportController from "./report.controller";

const router = Router();

router.get(
  "/collections",

  authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.ACCOUNTANT),

  reportController.getCollectionReport,
);

router.get(
  "/payments",
  authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.ACCOUNTANT),
  reportController.getPaymentReport,
);

export default router;
