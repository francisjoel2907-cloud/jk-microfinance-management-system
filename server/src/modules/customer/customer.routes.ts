import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";

import validateRequest from "../../middleware/validate.middleware";

import USER_ROLE from "../../shared/enums/user-role";

import customerController from "./customer.controller";

import customerValidation from "./customer.validation";

const router = Router();

router.get(
  "/",

  authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.ACCOUNTANT),

  customerController.getCustomers,
);

router.get(
  "/eligible-for-loan",

  authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.ACCOUNTANT),

  customerController.getEligibleLoanCustomers,
);

router.post(
  "/",

  authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),

  validateRequest(customerValidation.createCustomerSchema),

  customerController.createCustomer,
);

router.get(
  "/:id/statement",

  authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.ACCOUNTANT),

  customerController.getCustomerStatement,
);

router.patch(
  "/:id",

  authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),

  validateRequest(customerValidation.updateCustomerSchema),

  customerController.updateCustomer,
);

export default router;
