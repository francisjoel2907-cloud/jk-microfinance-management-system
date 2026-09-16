import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";
import userController from "./user.controller";
import USER_ROLE from "../../shared/enums/user-role";

const router = Router();

/* Every logged-in user */
router.get("/profile", authMiddleware(), userController.getProfile);

/* Admin Management */
router.get(
  "/",
  authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  userController.getUsers,
);

router.post(
  "/",
  authMiddleware(USER_ROLE.SUPER_ADMIN),
  userController.createUser,
);

router.patch(
  "/:id",
  authMiddleware(USER_ROLE.SUPER_ADMIN),
  userController.updateUser,
);

router.patch(
  "/:id/status",
  authMiddleware(USER_ROLE.SUPER_ADMIN),
  userController.toggleUserStatus,
);

export default router;
