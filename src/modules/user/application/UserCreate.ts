import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserCreateDTO } from "./dtos/UserCreateDTO";
import { UserMapper } from "./mappers/UserMapper";
import { PasswordHasher } from "./port/PasswordHasher";

export class UserCreate {
  constructor(
    private repository: UserRepository,
    private hasher: PasswordHasher
  ) {}

  async run(data: UserCreateDTO) {
    const password = await this.hasher.hash(data.password);

    const item = User.create({
      ...data,
      password,
      emailConfirm: false,
    });

    const userCreated = await this.repository.create(item);

    return UserMapper.toDTO(userCreated);
  }
}
