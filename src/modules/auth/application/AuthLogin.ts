import { UserRepository } from "@/modules/user/domain/UserRepository";
import { TokenService } from "./ports/TokenService";
import { AuthLoginDTO } from "./dtos/AuthLoginDTO";
import { PasswordHasher } from "@/modules/user/application/port/PasswordHasher";
import { LoginMapper } from "./mapper/LoginMapper";
import { ErrorInvalidCredentials } from "../infrastructure/errors/ErrorInvalidCredentials";
import { ErrorEmailNotVerified } from "../domain/errors/ErrorEmailNotVerified";

export class AuthLogin {
  constructor(
    private userRepo: UserRepository,
    private tokenService: TokenService,
    private hasher: PasswordHasher
  ) {}

  async run(data: AuthLoginDTO) {
    const user = await this.userRepo.findByEmail(data.email);

    if (!user) {
      throw new ErrorInvalidCredentials();
    }

    if (!user.isEmailConfirm()) {
      throw new ErrorEmailNotVerified();
    }

    const password = user.getPassword();

    const isValidate = await this.hasher.compare(data.password, password);

    if (!isValidate) {
      throw new ErrorInvalidCredentials();
    }

    const token = this.tokenService.generateToken({
      id: user.getId(),
      email: user.getEmail(),
      rol: user.getRol(),
    });

    return LoginMapper.toDTO(user, token);
  }
}
