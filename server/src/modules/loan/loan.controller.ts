import { Request, Response } from "express";

import asyncHandler from "../../core/utils/async-handler";

import HTTP_STATUS from "../../shared/constants/http-status";

import loanService from "./loan.service";

const getLoans = asyncHandler(async (req: Request, res: Response) => {
  const result = await loanService.getLoans();

  res.status(HTTP_STATUS.OK).json({
    success: true,

    message: "Loans fetched successfully",

    data: result,
  });
});

const getLoanById = asyncHandler(async (req: Request, res: Response) => {
  const result = await loanService.getLoanById(req.params.id as string);

  res.status(HTTP_STATUS.OK).json({
    success: true,

    message: "Loan fetched successfully",

    data: result,
  });
});

const createLoan = asyncHandler(async (req: Request, res: Response) => {
  const loanOfficerId = req.user!.userId;

  const result = await loanService.createLoan(req.body, loanOfficerId);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,

    message: "Loan created successfully",

    data: result,
  });
});

const loanController = {
  getLoans,

  getLoanById,

  createLoan,
};

export default loanController;
