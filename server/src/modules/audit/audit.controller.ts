import { Request, Response } from "express";

import asyncHandler from "../../core/utils/async-handler";

import HTTP_STATUS from "../../shared/constants/http-status";

import auditService from "./audit.service";

const getAuditLogs = asyncHandler(async (req: Request, res: Response) => {
  const result = await auditService.getAuditLogs();
  res.status(HTTP_STATUS.OK).json({
    success: true,

    message: "Audit logs fetched successfully",

    data: result,
  });
});

const auditController = {
  getAuditLogs,
};

export default auditController;
