import { NextFunction, Request, Response } from "express";

import ApiError from "../core/errors/api-error";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;

  let message = "Internal Server Error";

  if (error instanceof ApiError) {
    statusCode = error.statusCode;

    message = error.message;
  }

  console.log(error);

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
