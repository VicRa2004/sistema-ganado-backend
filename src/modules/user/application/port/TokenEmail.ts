import { UserEmailTokenDTO } from "../dtos/UserEmailTokenDTO";

export interface TokenEmail {
  generateToken(payload: UserEmailTokenDTO): string;
  verifyToken(token: string): UserEmailTokenDTO | null;
}
