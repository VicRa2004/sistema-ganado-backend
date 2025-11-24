import { RaceGetAll } from "@/modules/race/application/get/RaceGetAll";
import { repositories } from "../repositories";
import { RaceGetOne } from "@/modules/race/application/get/RaceGetOne";
import { RaceCreate } from "@/modules/race/application/RaceCreate";
import { RaceUpdate } from "@/modules/race/application/RaceUpdate";
import { RaceDelete } from "@/modules/race/application/RaceDelete";
import { services } from "../services";

export const raceUseCases = {
  getAll: new RaceGetAll(repositories.race),
  getOne: new RaceGetOne(repositories.race),
  create: new RaceCreate(repositories.race),
  update: new RaceUpdate(repositories.race),
  delete: new RaceDelete(repositories.race, services.uploader),
};
