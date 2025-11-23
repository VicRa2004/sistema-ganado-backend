import { AuthLogin } from "@/modules/auth/application/AuthLogin";
import { AuthRegister } from "@/modules/auth/application/AuthRegister";
import { repositories } from "../repositories";
import { services } from "../services";

export const authUseCases = {
  login: new AuthLogin(
    repositories.user,
    services.tokenService,
    services.passwordHasher
  ),
  register: new AuthRegister(repositories.user, services.passwordHasher),
};
