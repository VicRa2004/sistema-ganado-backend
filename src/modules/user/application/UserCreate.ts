import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserCreateDTO } from "./dtos/UserCreateDTO";
import { UserMapper } from "./mappers/UserMapper";

export class UserCreate {
  constructor(private repository: UserRepository) {}

  async run(data: UserCreateDTO) {
    const item = User.create({
      ...data,
      emailConfirm: false,
    });

    const userCreated = await this.repository.create(item);

    return UserMapper.toDTO(userCreated);
  }
}
