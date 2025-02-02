import { Response, Request } from "express";
import { ZodError } from "zod";
import { Error as ErrorSequelize } from "sequelize";
import {
  ErrorController,
  ErrorSesion,
  ErrorValidateEmail,
} from "../utils/errors";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

export const handleError = (
  error: unknown,
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response
) => {
  console.log(error as Error);

  if (error instanceof ErrorValidateEmail) {
    return res.status(401).json({
      status: 401,
      error: {
        messages: [error.message],
        type: "VALIDATE",
      },
    });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({
      status: 401,
      error: {
        messages: [error.message],
        type: "SESION",
      },
    });
  }

  if (error instanceof TokenExpiredError) {
    return res.status(401).json({
      status: 401,
      error: {
        messages: [error.message],
        type: "SESION",
      },
    });
  }

  if (error instanceof ErrorSesion) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      error: {
        messages: [error.message],
        type: "SESION",
      },
    });
  }

  if (error instanceof ErrorController) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      error: {
        messages: [error.message],
        type: "SERVER",
      },
    });
  }

  if (error instanceof ErrorSequelize) {
    return res.status(400).json({
      status: 400,
      error: {
        messages: [error.message],
        type: "DATABASE",
      },
    });
  }

  if (error instanceof ZodError) {
    const messages = error.errors.map((err) => {
      return err.message;
    });

    return res.status(400).json({
      statusCode: 400,
      error: {
        messages,
        type: "DATA_FORM",
      },
    });
  }

  if (error instanceof Error) {
    return res.status(500).json({
      status: 500,
      error: {
        messages: [error.message],
        type: "SERVER",
      },
    });
  }

  return res.status(500).json({
    status: 500,
    error: {
      messages: ["Unknown error"],
      type: "UNKNOWN",
    },
  });
};
