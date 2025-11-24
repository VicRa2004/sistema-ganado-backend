import { NextFunction, Request, Response } from "express";
import { ErrorNotFound } from "../../domain/errors/ErrorNotFound";
import { ErrorInvalidData } from "../../domain/errors/ErrorInvalidData";
import { ErrorInvalidDate } from "../../domain/errors/ErrorInvalidDate";
import { ErrorAuthInvalidToken } from "@/modules/auth/infrastructure/errors/ErrorAuthInvalidToken";
import { ErrorUnauthorized } from "../errors/ErrorUnauthorized";
import { ZodError } from "zod";
import { ErrorInvalidCredentials } from "@/modules/auth/infrastructure/errors/ErrorInvalidCredentials";
import { ErrorEmailNotVerified } from "@/modules/auth/domain/errors/ErrorEmailNotVerified";

const errorHandler = (
  res: Response,
  message: string = "Internal server error",
  status: number = 500,
  data: object = {}
) => {
  res.status(status).json({
    success: false,
    error: {
      message,
      ...data,
    },
  });
};

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ErrorInvalidCredentials) {
    return void errorHandler(res, err.message, 400);
  }

  if (err instanceof ErrorEmailNotVerified) {
    return void errorHandler(res, err.message, 400);
  }

  if (err instanceof ErrorNotFound) {
    return void errorHandler(res, err.message, 404);
  }

  if (err instanceof ErrorInvalidData) {
    return void errorHandler(res, err.message, 400);
  }

  if (err instanceof ErrorInvalidDate) {
    return void errorHandler(res, err.message, 400);
  }

  if (err instanceof ErrorAuthInvalidToken) {
    console.log(err.message);
    return void errorHandler(res, err.message, 401);
  }

  if (err instanceof ErrorUnauthorized) {
    console.log(err.message);
    return void errorHandler(res, err.message, 403);
  }

  if (err instanceof ZodError) {
    return void errorHandler(res, err.message, 400);
  }

  console.log(err);

  return void errorHandler(res, "Internal server error", 500);
};
