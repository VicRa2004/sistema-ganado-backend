import { container } from "@/core/container";
import { NextFunction, Request, Response } from "express";
import { ironGetAllSchema, ironGetOneSchema } from "../schemas/get";
import { userSchema } from "@/core/shared/infrastructure/schemas/user.schema";
import { responseController } from "@/core/shared/infrastructure/response.controller";
import { ironCreateSchema } from "../schemas/post";
import { ErrorImageRequired } from "@/modules/images/domain/errors/ErrorImageRequied";
import { ironUpdateSchema } from "../schemas/put";

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
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { params } = ironGetOneSchema.parse(req);

      const data = container.iron.getOne.run(params.id);

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
      const { body } = ironCreateSchema.parse(req);
      const { user } = userSchema.parse(req);

      if (!req.file) {
        throw new ErrorImageRequired();
      }

      const imageURL = await container.services.uploader.upload(req.file);

      const data = await container.iron.create.run({
        image: imageURL,
        name: body.name,
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
      const { body, params } = ironUpdateSchema.parse(req);
      const { user } = userSchema.parse(req);

      let imageURL: string | undefined;

      if (req.file) {
        imageURL = await container.services.uploader.upload(req.file);
      }

      const data = await container.iron.update.run({
        id: params.id,
        name: body.name,
        idUser: user.id,
        image: imageURL,
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
      const { params } = ironGetOneSchema.parse(req);

      await container.iron.delete.run(params.id);

      responseController({
        res,
        message: "Iron deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}
