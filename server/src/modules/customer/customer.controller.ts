import { Request, Response } from "express";

import asyncHandler from "../../core/utils/async-handler";

import HTTP_STATUS from "../../shared/constants/http-status";

import customerService from "./customer.service";

const getCustomers = asyncHandler(async (req: Request, res: Response) => {
  const result = await customerService.getCustomers();

  res.status(HTTP_STATUS.OK).json({
    success: true,

    message: "Customers fetched successfully",

    data: result,
  });
});

const getEligibleLoanCustomers = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await customerService.getEligibleLoanCustomers();

    res.status(HTTP_STATUS.OK).json({
      success: true,

      message: "Eligible customers fetched successfully",

      data: result,
    });
  },
);

const createCustomer = asyncHandler(async (req: Request, res: Response) => {
  const result = await customerService.createCustomer(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,

    message: "Customer created successfully",

    data: result,
  });
});

const updateCustomer = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const result = await customerService.updateCustomer(id, req.body);

  res.status(HTTP_STATUS.OK).json({
    success: true,

    message: "Customer updated successfully",

    data: result,
  });
});

const getCustomerStatement = asyncHandler(
  async (req: Request, res: Response, next) => {
    const id = String(req.params.id);

    const statement = await customerService.getCustomerStatement(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,

      message: "Customer statement fetched successfully",

      data: statement,
    });
  },
);

const customerController = {
  getCustomers,

  getEligibleLoanCustomers,

  createCustomer,

  updateCustomer,

  getCustomerStatement,
};

export default customerController;
