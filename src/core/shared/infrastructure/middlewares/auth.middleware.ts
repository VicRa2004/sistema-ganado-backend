import { NextFunction, Request, Response } from "express";
import { container } from "@/core/container";
import { ErrorAuthInvalidToken } from "@/modules/auth/infrastructure/errors/ErrorAuthInvalidToken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]; // El formato es "Bearer TOKEN"

  try {
    if (!token) {
      throw new ErrorAuthInvalidToken();
    }

    const data = container.tokenService.verifyToken(token);

    if (!data) {
      throw new ErrorAuthInvalidToken();
    }

    // mandamos la info para que pueda ser usada.
    req.user = data;

    next();
  } catch (error) {
    next(error);
  }
};
