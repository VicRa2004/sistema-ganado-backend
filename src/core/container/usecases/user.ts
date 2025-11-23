import { UserGetAll } from "@/modules/user/application/get/UserGetAll";
import { UserGetOne } from "@/modules/user/application/get/UserGetOne";
import { UserActivateAccount } from "@/modules/user/application/UserActivateAccount";
import { UserCreate } from "@/modules/user/application/UserCreate";
import { UserDelete } from "@/modules/user/application/UserDelete";
import { UserGenerateToken } from "@/modules/user/application/UserGenerateToken";
import { UserUpdate } from "@/modules/user/application/UserUpdate";
import { repositories } from "../repositories";
import { services } from "../services";

export const userUseCases = {
  getAll: new UserGetAll(repositories.user),
  getOne: new UserGetOne(repositories.user),
  create: new UserCreate(repositories.user, services.passwordHasher),
  update: new UserUpdate(repositories.user),
  delete: new UserDelete(repositories.user),
  activate: new UserActivateAccount(
    repositories.user,
    services.emailTokenService
  ),
  generateToken: new UserGenerateToken(services.emailTokenService),
};
