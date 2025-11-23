import { IronGetAll } from "@/modules/iron/application/get/IronGetAll";
import { IronGetOne } from "@/modules/iron/application/get/IronGetOne";
import { IronCreate } from "@/modules/iron/application/IronCreate";
import { IronDelete } from "@/modules/iron/application/IronDelete";
import { IronUpdate } from "@/modules/iron/application/IronUpdate";
import { repositories } from "../repositories";
import { services } from "../services";

export const ironUseCases = {
  getAll: new IronGetAll(repositories.iron),
  getOne: new IronGetOne(repositories.iron),
  create: new IronCreate(repositories.iron),
  update: new IronUpdate(repositories.iron),
  delete: new IronDelete(repositories.iron, services.uploader),
};
