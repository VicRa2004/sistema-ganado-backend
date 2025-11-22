import { container } from "@/core/container";
import { responseController } from "@/core/shared/infrastructure/response.controller";
import { NextFunction, Request, Response } from "express";
import { groundGetOneSchema, groundGetSchema } from "../schemas/get";
import { userSchema } from "@/core/shared/infrastructure/schemas/user.schema";

export class GroundController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = groundGetSchema.parse(req);
      const { user } = userSchema.parse(req); // para verificar si existe el id

      const data = await container.ground.getAll.run({
        ...body,
        idUser: user.id,
      });

      return responseController({
        res,
        status: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { params } = groundGetOneSchema.parse(req);

      const data = await container.ground.getOne.run(params.id);

      return responseController({
        res,
        status: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
