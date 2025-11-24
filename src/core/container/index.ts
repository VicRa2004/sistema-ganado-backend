// core/container/index.ts
import { services } from "./services";
import { repositories } from "./repositories";
import { groundUseCases } from "./usecases/ground";
import { ironUseCases } from "./usecases/iron";
import { userUseCases } from "./usecases/user";
import { authUseCases } from "./usecases/auth";
import { sendEmailUseCase } from "@/modules/email/infrastructure";
import { cattleUseCases } from "./usecases/cattle";
import { raceUseCases } from "./usecases/race";

export const container = {
  repos: repositories,
  services,
  auth: authUseCases,
  ground: groundUseCases,
  iron: ironUseCases,
  user: userUseCases,
  cattle: cattleUseCases,
  race: raceUseCases,
  email: {
    send: sendEmailUseCase,
  },
};
