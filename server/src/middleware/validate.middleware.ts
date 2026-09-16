import { NextFunction, Request, Response } from "express";

import { ZodSchema } from "zod";

import HTTP_STATUS from "../shared/constants/http-status";

const validateMiddleware =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "Validation failed",

        errors: result.error.flatten().fieldErrors,
      });
    }

    req.body = result.data;

    next();
  };

export default validateMiddleware;
