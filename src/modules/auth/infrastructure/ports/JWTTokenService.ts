import jwt from "jsonwebtoken";
import { TokenService } from "@/modules/auth/application/ports/TokenService";
import { AuthTokenPayloadDTO } from "@/modules/auth/application/dtos/AuthTokenPayloadDTO";

export class JWTTokenService implements TokenService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(secret: string, expiresIn: string = "1d") {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  generateToken(payload: AuthTokenPayloadDTO): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });
  }

  verifyToken(token: string): AuthTokenPayloadDTO | null {
    try {
      const decoded = jwt.verify(token, this.secret);
      return decoded as AuthTokenPayloadDTO;
    } catch {
      return null;
    }
  }
}
