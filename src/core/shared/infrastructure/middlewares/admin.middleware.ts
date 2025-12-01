import { NextFunction, Request, Response } from "express";
import { userSchema } from "../schemas/user.schema";
import { UserRol } from "@/modules/user/domain/UserRol";
import { ErrorAccessDenied } from "../errors/ErrorAccessDenied";

export const adminMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const { user } = userSchema.parse(req);

    if (user.rol !== UserRol.ADMIN) {
      throw new ErrorAccessDenied();
    }

    next();
  } catch (error) {
    next(error);
  }
};
