import { NextFunction, Request, Response } from "express";
import { container } from "@/core/container";
import { ErrorAuthInvalidToken } from "@/modules/auth/infrastructure/errors/ErrorAuthInvalidToken";
import { UserRol } from "@/modules/user/domain/UserRol";

// El request tipado que usarán los controladores
export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    rol: UserRol;
  };
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("dkdkdkddkdk");
  console.log(token);

  try {
    console.log("llega");
    if (!token) {
      throw new ErrorAuthInvalidToken();
    }

    const data = container.services.tokenService.verifyToken(token);

    if (!data) {
      throw new ErrorAuthInvalidToken();
    }

    // Adaptamos el request a tu tipo personalizado
    (req as AuthenticatedRequest).user = data;

    next();
  } catch (error) {
    next(error);
  }
};
