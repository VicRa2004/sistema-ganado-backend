import { container } from "@/core/container";
import { NextFunction, Request, Response } from "express";
import { loginSchema } from "../schema/loginSchema";
import { responseController } from "@/core/shared/infrastructure/response.controller";

export class ExpressAuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = loginSchema.parse(req);
      const data = await container.auth.login(body);

      responseController({
        res,
        status: 200,
        data: data ?? undefined,
      });
    } catch (error) {
      next(error);
    }
  }
}
