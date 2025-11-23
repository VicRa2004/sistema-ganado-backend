import { UserRepository } from "@/modules/user/domain/UserRepository";
import { TokenEmail } from "./port/TokenEmail";
import { ErrorInvalidEmailToken } from "../domain/errors/ErrorInvalidEmailToken";
import { ErrorUserNotFound } from "../domain/errors/ErrorUserNotFound";

export class UserActivateAccount {
  constructor(
    private userRepo: UserRepository,
    private tokenEmail: TokenEmail
  ) {}

  async run(token: string) {
    const data = this.tokenEmail.verifyToken(token);

    if (!data) {
      throw new ErrorInvalidEmailToken();
    }

    const user = await this.userRepo.findByEmail(data.email);

    if (!user) {
      throw new ErrorUserNotFound();
    }

    user.setEmailConfirm(true);

    await this.userRepo.update(user);
  }
}
