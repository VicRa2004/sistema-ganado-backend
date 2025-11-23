import { container } from "@/core/container";
import { NextFunction, Request, Response } from "express";
import { loginSchema } from "../schema/loginSchema";
import { responseController } from "@/core/shared/infrastructure/response.controller";
import { registerSchema } from "../schema/registerSchema";
import { UserRol } from "@/modules/user/domain/UserRol";

export class ExpressAuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = loginSchema.parse(req);

      const data = await container.auth.login.run(body);

      responseController({
        res,
        data: data ?? undefined,
      });
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = registerSchema.parse(req);

      const data = await container.auth.register.run({
        ...body,
        rol: UserRol.USER, // User por defecto
      });

      responseController({
        res,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
