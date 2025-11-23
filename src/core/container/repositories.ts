// core/container/repositories.ts
import { PrismaGroundRepository } from "@/modules/ground/infrastructure/repositories/PrismaGroundRepository";
import { PrismaUserRepository } from "@/modules/user/infrastructure/repositories/PrismaUserRepository";
import { PrismaIronRepository } from "@/modules/iron/infrastructure/repositories/PrismaIronRepository";

export const repositories = {
  ground: new PrismaGroundRepository(),
  iron: new PrismaIronRepository(),
  user: new PrismaUserRepository(),
};
