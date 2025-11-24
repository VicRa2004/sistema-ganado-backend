import { container } from "@/core/container";
import { responseController } from "@/core/shared/infrastructure/response.controller";
import { NextFunction, Request, Response } from "express";
import { raceGetOneSchema } from "../schema/get";
import { raceCreateSchema } from "../schema/post";
import { raceUpdateSchema } from "../schema/put";

export class ExpressRaceController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await container.race.getAll.run();

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
      const { params } = raceGetOneSchema.parse(req);

      const data = await container.race.getOne.run(params.id);

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
      const { body } = raceCreateSchema.parse(req);

      let imageURL: string | undefined;

      if (req.file) {
        imageURL = await container.services.uploader.upload(req.file);
      }

      const data = await container.race.create.run({
        ...body,
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

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { body, params } = raceUpdateSchema.parse(req);

      let imageURL: string | undefined;

      if (req.file) {
        imageURL = await container.services.uploader.upload(req.file);
      }

      const data = await container.race.update.run({
        ...body,
        id: params.id,
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
      const { params } = raceGetOneSchema.parse(req);

      await container.race.delete.run(params.id);

      responseController({
        res,
        message: "Race deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}
