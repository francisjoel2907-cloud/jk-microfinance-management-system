import { Request, Response } from "express";

import asyncHandler from "../../core/utils/async-handler";

import HTTP_STATUS from "../../shared/constants/http-status";

import userService from "./user.service";

const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const result = await userService.getMyProfile(userId);

  res.status(HTTP_STATUS.OK).json({
    success: true,

    message: "User profile fetched successfully",

    data: result,
  });
});

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getUsers();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
});

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.updateUser(String(req.params.id), req.body);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const toggleUserStatus = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.toggleUserStatus(String(req.params.id));

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User status updated successfully",
    data: result,
  });
});

const userController = {
  getProfile,
  getUsers,
  createUser,
  updateUser,
  toggleUserStatus,
};

export default userController;
