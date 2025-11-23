import { container } from "@/core/container";
import { responseController } from "@/core/shared/infrastructure/response.controller";
import { NextFunction, Request, Response } from "express";
import { groundGetOneSchema, groundGetSchema } from "../schemas/get";
import { userSchema } from "@/core/shared/infrastructure/schemas/user.schema";
import { groundCreateSchema } from "../schemas/post";
import { groundUpdateSchema } from "../schemas/put";

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
      const { body } = groundCreateSchema.parse(req);
      const { user } = userSchema.parse(req);
      let imageURL;

      if (req.file) {
        imageURL = await container.image.upload(req.file);
      }

      const data = await container.ground.create.run({
        ...body,
        idUser: user.id,
        image: imageURL,
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

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { body, params } = groundUpdateSchema.parse(req);
      const { user } = userSchema.parse(req);
      let imageURL;

      if (req.file) {
        imageURL = await container.image.upload(req.file);
      }

      const data = await container.ground.update.run({
        id: params.id,
        ...body,
        image: imageURL,
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

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { params } = groundGetOneSchema.parse(req);
      const { user } = userSchema.parse(req);

      await container.ground.delete.run(params.id, user.id);

      return responseController({
        res,
        message: "Ground deleted correcty",
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
}
