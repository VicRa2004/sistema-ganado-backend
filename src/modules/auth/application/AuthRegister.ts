import { UserCreateDTO } from "@/modules/user/application/dtos/UserCreateDTO";
import { UserMapper } from "@/modules/user/application/mappers/UserMapper";
import { PasswordHasher } from "@/modules/user/application/port/PasswordHasher";
import { User } from "@/modules/user/domain/User";
import { UserRepository } from "@/modules/user/domain/UserRepository";

export class AuthRegister {
  constructor(
    private userRepo: UserRepository,
    private hasher: PasswordHasher
  ) {}

  async run(data: UserCreateDTO) {
    const password = await this.hasher.hash(data.password);

    const item = User.create({
      ...data,
      password,
      emailConfirm: false,
    });

    const userCreated = await this.userRepo.create(item);

    return UserMapper.toDTO(userCreated);
  }
}
