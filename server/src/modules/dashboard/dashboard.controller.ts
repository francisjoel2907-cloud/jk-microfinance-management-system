import { Request, Response } from "express";

import asyncHandler from "../../core/utils/async-handler";

import HTTP_STATUS from "../../shared/constants/http-status";

import dashboardService from "./dashboard.service";

const getDashboardStatistics = asyncHandler(
  async (req: Request, res: Response) => {
    const statistics = await dashboardService.getDashboardStatistics();

    const monthlyCollections = await dashboardService.getMonthlyCollections();

    res.status(HTTP_STATUS.OK).json({
      success: true,

      message: "Dashboard statistics fetched successfully",

      data: {
        ...statistics,

        monthlyCollections,
      },
    });
  },
);

const dashboardController = {
  getDashboardStatistics,
};

export default dashboardController;
