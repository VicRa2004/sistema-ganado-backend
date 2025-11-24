import { NextFunction, Request, Response } from "express";
import { userSchema } from "../schemas/user.schema";
import { UserRol } from "@/modules/user/domain/UserRol";
import { ErrorUnauthorized } from "../errors/ErrorUnauthorized";

export const adminMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const { user } = userSchema.parse(req);

    if (user.rol !== UserRol.ADMIN) {
      throw new ErrorUnauthorized();
    }

    next();
  } catch (error) {
    next(error);
  }
};
