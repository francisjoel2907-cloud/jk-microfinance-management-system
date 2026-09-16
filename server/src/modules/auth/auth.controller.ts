import { Request, Response } from "express";

import asyncHandler from "../../core/utils/async-handler";

import HTTP_STATUS from "../../shared/constants/http-status";

import authService from "./auth.service";

const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);

  res.status(HTTP_STATUS.CREATED).json(result);
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  res.status(HTTP_STATUS.OK).json(result);
});

const getMe = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.getMe(req.user!.userId);

  res.status(HTTP_STATUS.OK).json(result);
});

const authController = {
  register,

  login,

  getMe,
};

export default authController;
