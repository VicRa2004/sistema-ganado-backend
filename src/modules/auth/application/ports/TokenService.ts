import { AuthTokenPayloadDTO } from "../dtos/AuthTokenPayloadDTO";

export interface TokenService {
  generateToken(payload: AuthTokenPayloadDTO): string;
  verifyToken(token: string): AuthTokenPayloadDTO | null;
}
