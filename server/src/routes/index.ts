import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";

import userRoutes from "../modules/user/user.routes";

import customerRoutes from "../modules/customer/customer.routes";

import loanRoutes from "../modules/loan/loan.routes";

import paymentRoutes from "../modules/payment/payment.routes";

import dashboardRoutes from "../modules/dashboard/dashboard.routes";

import reportRoutes from "../modules/report/report.routes";

import auditRoutes from "../modules/audit/audit.routes";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,

    message: "API is running successfully",
  });
});

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/customers", customerRoutes);

router.use("/loans", loanRoutes);

router.use("/payments", paymentRoutes);

router.use("/dashboard", dashboardRoutes);

router.use("/reports", reportRoutes);

router.use("/audits", auditRoutes);

export default router;
