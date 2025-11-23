import jwt from "jsonwebtoken";
import { TokenEmail } from "@/modules/user/application/port/TokenEmail";
import { UserEmailTokenDTO } from "@/modules/user/application/dtos/UserEmailTokenDTO";

export class JWTEmailToken implements TokenEmail {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(secret: string, expiresIn: string = "1d") {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  generateToken(payload: UserEmailTokenDTO): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });
  }

  verifyToken(token: string): UserEmailTokenDTO | null {
    try {
      const decoded = jwt.verify(token, this.secret);
      return decoded as UserEmailTokenDTO;
    } catch {
      return null;
    }
  }
}
