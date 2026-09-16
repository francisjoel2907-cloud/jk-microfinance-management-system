import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import prisma from "../../prisma/client";

import { env } from "../../config/env";

import ApiError from "../../core/errors/api-error";

import HTTP_STATUS from "../../shared/constants/http-status";

import MESSAGES from "../../shared/constants/messages";

import { AuthResponse, LoginPayload, RegisterPayload } from "./auth.types";

const registerUser = async (payload: RegisterPayload) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: payload.email,
        },

        {
          phone: payload.phone,
        },
      ],
    },
  });

  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      firstName: payload.firstName,

      lastName: payload.lastName,

      email: payload.email,

      phone: payload.phone,

      password: hashedPassword,

      role: payload.role,
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

  return {
    success: true,

    message: "User registered successfully",

    data: user,
  };
};

const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,

      MESSAGES.AUTH.INVALID_CREDENTIALS,
    );
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,

      MESSAGES.AUTH.INVALID_CREDENTIALS,
    );
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,

      email: user.email,

      role: user.role,
    },

    env.JWT_SECRET,

    {
      expiresIn: "1d",
    },
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id,
    },

    env.JWT_REFRESH_SECRET,

    {
      expiresIn: "7d",
    },
  );

  return {
    success: true,

    message: MESSAGES.AUTH.LOGIN_SUCCESS,

    accessToken,

    refreshToken,
  };
};

const getMe = async (userId: string) => {
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

      isActive: true,

      createdAt: true,
    },
  });

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  return {
    success: true,

    message: "User profile fetched successfully",

    data: user,
  };
};

const authService = {
  registerUser,

  loginUser,

  getMe,
};

export default authService;
