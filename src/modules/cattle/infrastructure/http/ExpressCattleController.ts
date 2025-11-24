import { container } from "@/core/container";
import { NextFunction, Request, Response } from "express";
import { cattleGetAllSchema, cattleGetOneSchema } from "../schemas/get";
import { userSchema } from "@/core/shared/infrastructure/schemas/user.schema";
import { responseController } from "@/core/shared/infrastructure/response.controller";
import { cattleCreateSchema } from "../schemas/post";
import { cattleUpdateSchema } from "../schemas/put";

export class ExpressCattleController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = cattleGetAllSchema.parse(req);
      const { user } = userSchema.parse(req);

      const data = await container.cattle.getAll.run({
        ...query,
        idUser: user.id,
      });

      responseController({
        res,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { params } = cattleGetOneSchema.parse(req);
      const { user } = userSchema.parse(req);

      const data = await container.cattle.getOne.run(params.id, user.id);

      responseController({
        res,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = cattleCreateSchema.parse(req);
      const { user } = userSchema.parse(req);

      let imageURL: string | undefined;

      if (req.file) {
        imageURL = await container.services.uploader.upload(req.file);
      }

      const data = await container.cattle.create.run({
        ...body,
        image: imageURL,
        idUser: user.id,
      });

      responseController({
        res,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { body, params } = cattleUpdateSchema.parse(req);
      const { user } = userSchema.parse(req);

      let imageURL: string | undefined;

      if (req.file) {
        imageURL = await container.services.uploader.upload(req.file);
      }

      const data = await container.cattle.update.run({
        ...body,
        id: params.id,
        image: imageURL,
        idUser: user.id,
      });

      responseController({
        res,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { params } = cattleGetOneSchema.parse(req);

      await container.cattle.delete.run(params.id);

      responseController({
        res,
      });
    } catch (error) {
      next(error);
    }
  }
}
