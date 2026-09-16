import { Request, Response } from "express";

import asyncHandler from "../../core/utils/async-handler";

import HTTP_STATUS from "../../shared/constants/http-status";

import paymentService from "./payment.service";

const getPayments = asyncHandler(async (req: Request, res: Response) => {
  const { period, startDate, endDate } = req.query;

  const result = await paymentService.getPayments(
    period as string,
    startDate as string,
    endDate as string,
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Payments fetched successfully",
    data: result,
  });
});

const createPayment = asyncHandler(async (req: Request, res: Response) => {
  const result = await paymentService.createPayment(
    req.body,

    req.user!.userId,
  );

  res.status(HTTP_STATUS.CREATED).json({
    success: true,

    message: "Payment recorded successfully",

    data: result,
  });
});

const getPaymentReceipt = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const result = await paymentService.getPaymentReceipt(id);

  res.status(HTTP_STATUS.OK).json({
    success: true,

    message: "Payment receipt fetched successfully",

    data: result,
  });
});

const paymentController = {
  getPayments,

  createPayment,

  getPaymentReceipt,
};

export default paymentController;
