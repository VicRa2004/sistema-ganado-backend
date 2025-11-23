// core/container/usecases/ground.ts
import { repositories } from "../repositories";
import { services } from "../services";

import { GroundGetAll } from "@/modules/ground/application/get/GroundGetAll";
import { GroundGetOne } from "@/modules/ground/application/get/GroundGetOne";
import { GroundCreate } from "@/modules/ground/application/GroundCreate";
import { GroundUpdate } from "@/modules/ground/application/GroundUpdate";
import { GroundDelete } from "@/modules/ground/application/GroundDelete";

export const groundUseCases = {
  getAll: new GroundGetAll(repositories.ground),
  getOne: new GroundGetOne(repositories.ground),
  create: new GroundCreate(repositories.ground),
  update: new GroundUpdate(repositories.ground),
  delete: new GroundDelete(repositories.ground, services.uploader),
};
