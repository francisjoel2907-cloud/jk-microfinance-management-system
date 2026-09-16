import { Router } from "express";

import loanController from "./loan.controller";

import loanValidation from "./loan.validation";

import validateMiddleware from "../../middleware/validate.middleware";

import authMiddleware from "../../middleware/auth.middleware";

import USER_ROLE from "../../shared/enums/user-role";

const router = Router();

router.get(
  "/",

  authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.ACCOUNTANT),

  loanController.getLoans,
);

router.get(
  "/:id",

  authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.ACCOUNTANT),

  loanController.getLoanById,
);

router.post(
  "/",

  authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),

  validateMiddleware(loanValidation.createLoanSchema),

  loanController.createLoan,
);

const loanRoutes = router;

export default loanRoutes;
