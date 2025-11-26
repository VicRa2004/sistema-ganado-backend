// core/container/repositories.ts
import { PrismaGroundRepository } from "@/modules/ground/infrastructure/repositories/PrismaGroundRepository";
import { PrismaUserRepository } from "@/modules/user/infrastructure/repositories/PrismaUserRepository";
import { PrismaIronRepository } from "@/modules/iron/infrastructure/repositories/PrismaIronRepository";
import { PrismaCattleRepository } from "@/modules/cattle/infrastructure/repositories/PrismaCattleRepository";
import { PrismaRaceRepository } from "@/modules/race/infrastructure/repositories/PrismaRaceRepository";
import { PrismaCattleQueries } from "@/modules/cattle/infrastructure/repositories/PrismaCattleQueries";

export const repositories = {
  race: new PrismaRaceRepository(),
  ground: new PrismaGroundRepository(),
  iron: new PrismaIronRepository(),
  user: new PrismaUserRepository(),
  cattle: new PrismaCattleRepository(),
  cattleQuery: new PrismaCattleQueries(),
};
