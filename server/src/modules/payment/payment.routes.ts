import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";

import validateMiddleware from "../../middleware/validate.middleware";

import USER_ROLE from "../../shared/enums/user-role";

import paymentController from "./payment.controller";

import paymentValidation from "./payment.validation";

const router = Router();

router.get(
  "/",

  authMiddleware(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.ADMIN,
    USER_ROLE.ACCOUNTANT,
    USER_ROLE.CASHIER,
  ),

  paymentController.getPayments,
);

router.post(
  "/",

  authMiddleware(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.ADMIN,
    USER_ROLE.ACCOUNTANT,
    USER_ROLE.CASHIER,
  ),

  validateMiddleware(paymentValidation.createPaymentSchema),

  paymentController.createPayment,
);

router.get(
  "/:id/receipt",

  authMiddleware(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.ADMIN,
    USER_ROLE.ACCOUNTANT,
    USER_ROLE.CASHIER,
  ),

  paymentController.getPaymentReceipt,
);

export default router;
