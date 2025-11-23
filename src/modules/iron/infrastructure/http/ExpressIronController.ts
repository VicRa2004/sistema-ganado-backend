import { container } from "@/core/container";
import { NextFunction, Request, Response } from "express";
import { ironGetAllSchema } from "../schemas/get";
import { userSchema } from "@/core/shared/infrastructure/schemas/user.schema";
import { responseController } from "@/core/shared/infrastructure/response.controller";

export class ExpressIronController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = ironGetAllSchema.parse(req);
      const { user } = userSchema.parse(req);
      const data = await container.iron.getAll.run({
        ...query,
        idUser: user.id,
      });

      responseController({
        res,
        data,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
}
