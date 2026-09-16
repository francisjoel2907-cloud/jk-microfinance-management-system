import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

import { env } from "../config/env";

import ApiError from "../core/errors/api-error";

import HTTP_STATUS from "../shared/constants/http-status";

import MESSAGES from "../shared/constants/messages";

const authMiddleware =
  (...requiredRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,

        MESSAGES.AUTH.TOKEN_REQUIRED,
      );
    }

    const token = authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,

        env.JWT_SECRET,
      ) as JwtPayload;

      req.user = decoded;

      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new ApiError(
          HTTP_STATUS.FORBIDDEN,

          MESSAGES.COMMON.FORBIDDEN,
        );
      }

      next();
    } catch (error) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,

        MESSAGES.AUTH.TOKEN_INVALID,
      );
    }
  };

export default authMiddleware;
