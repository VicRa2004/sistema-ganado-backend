import { UserRepository } from "../domain/UserRepository";

export class UserDelete {
  constructor(private repository: UserRepository) {}

  async run(id: number) {
    await this.repository.delete(id);
  }
}
