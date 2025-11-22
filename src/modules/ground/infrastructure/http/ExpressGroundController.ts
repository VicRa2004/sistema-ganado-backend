import { container } from "@/core/container";
import { responseController } from "@/core/shared/infrastructure/response.controller";
import { NextFunction, Request, Response } from "express";

export class GroundController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await container.ground.getAll({ page: 1, limit: 10 });

      return responseController({
        res,
        status: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
