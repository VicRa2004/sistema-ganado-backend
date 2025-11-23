import { CattleCreate } from "@/modules/cattle/application/CattleCreate";
import { CattleDelete } from "@/modules/cattle/application/CattleDelete";
import { CattleUpdate } from "@/modules/cattle/application/CattleUpdate";
import { CattleGetAll } from "@/modules/cattle/application/get/CattleGetAll";
import { CattleGetOne } from "@/modules/cattle/application/get/CattleGetOne";
import { repositories } from "../repositories";
import { services } from "../services";

export const cattleUseCases = {
  getAll: new CattleGetAll(repositories.cattle),
  getOne: new CattleGetOne(repositories.cattle),
  create: new CattleCreate(repositories.cattle),
  update: new CattleUpdate(repositories.cattle),
  delete: new CattleDelete(repositories.cattle, services.uploader),
};
