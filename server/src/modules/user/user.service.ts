import prisma from "../../prisma/client";
import bcrypt from "bcrypt";

import ApiError from "../../core/errors/api-error";
import HTTP_STATUS from "../../shared/constants/http-status";
import MESSAGES from "../../shared/constants/messages";

import {
  UserProfile,
  UserList,
  CreateUserPayload,
  UpdateUserPayload,
} from "./user.types";

const getMyProfile = async (userId: string): Promise<UserProfile | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,

      firstName: true,

      lastName: true,

      email: true,

      phone: true,

      role: true,

      createdAt: true,
    },
  });

  return user;
};
const getUsers = async (): Promise<UserList[]> => {
  return prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const createUser = async (payload: CreateUserPayload) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: payload.email }, { phone: payload.phone }],
    },
  });

  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.AUTH.USER_ALREADY_EXISTS);
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
};

const updateUser = async (userId: string, payload: UpdateUserPayload) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.AUTH.USER_NOT_FOUND);
  }

  return prisma.user.update({
    where: { id: userId },
    data: payload,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
};

const toggleUserStatus = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.AUTH.USER_NOT_FOUND);
  }

  return prisma.user.update({
    where: { id: userId },
    data: {
      isActive: !user.isActive,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      role: true,
      isActive: true,
    },
  });
};

const userService = {
  getMyProfile,
  getUsers,
  createUser,
  updateUser,
  toggleUserStatus,
};
export default userService;
