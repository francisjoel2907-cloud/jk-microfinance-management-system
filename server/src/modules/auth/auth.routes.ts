import { Router } from "express";

import authController from "./auth.controller";

import authValidation from "./auth.validation";

import validateMiddleware from "../../middleware/validate.middleware";

import authMiddleware from "../../middleware/auth.middleware";

import USER_ROLE from "../../shared/enums/user-role";

const router = Router();

router.post(
  "/register",

  validateMiddleware(authValidation.registerSchema),

  authController.register,
);

router.get(
  "/me",

  authMiddleware(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.ADMIN,
    USER_ROLE.ACCOUNTANT,
    USER_ROLE.CASHIER,
  ),

  authController.getMe,
);

router.post(
  "/login",

  validateMiddleware(authValidation.loginSchema),

  authController.login,
);

export default router;
