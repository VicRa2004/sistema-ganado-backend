import bcrypt from "bcryptjs";
import { PasswordHasher } from "../../application/port/PasswordHasher";

export class BcryptPasswordHasher implements PasswordHasher {
  private readonly rounds = 10; // Número de salt rounds

  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.rounds);
    return bcrypt.hash(password, salt);
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}
