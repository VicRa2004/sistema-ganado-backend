import { ErrorUserNotFound } from "../../domain/errors/ErrorUserNotFound";
import { UserRepository } from "../../domain/UserRepository";
import { UserMapper } from "../mappers/UserMapper";

export class UserGetOne {
  constructor(private repository: UserRepository) {}

  async run(id: number) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new ErrorUserNotFound();
    }

    return UserMapper.toDTO(item);
  }
}
