import { Request, Response } from "express";

import asyncHandler from "../../core/utils/async-handler";

import HTTP_STATUS from "../../shared/constants/http-status";

import reportService from "./report.service";

const getCollectionReport = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;

  const result = await reportService.getCollectionReport(
    period as string,
    startDate as string,
    endDate as string,
  );

  res.status(200).json({
    success: true,
    message: "Collection report fetched successfully",
    data: result,
  });
});

const getPaymentReport = asyncHandler(async (req: Request, res: Response) => {
  const { period, startDate, endDate } = req.query;

  const result = await reportService.getPaymentReport(
    period as string,
    startDate as string,
    endDate as string,
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Payment report fetched successfully",
    data: result,
  });
});

const reportController = {
  getCollectionReport,
  getPaymentReport,
};

export default reportController;
