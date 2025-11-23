import { TokenEmail } from "./port/TokenEmail";

export class UserGenerateToken {
  constructor(private tokenEmail: TokenEmail) {}

  run(id: number, email: string) {
    const token = this.tokenEmail.generateToken({ id, email });

    return token;
  }
}
