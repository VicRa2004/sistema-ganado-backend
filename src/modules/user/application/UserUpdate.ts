import { ErrorUserNotFound } from "../domain/errors/ErrorUserNotFound";
import { UserRepository } from "../domain/UserRepository";
import { UserUpdateDTO } from "./dtos/UserUpdateDTO";
import { UserMapper } from "./mappers/UserMapper";

export class UserUpdate {
  constructor(private repository: UserRepository) {}

  async run(data: UserUpdateDTO) {
    const user = await this.repository.findById(data.id);

    if (!user) {
      throw new ErrorUserNotFound();
    }

    if (data.fullName) {
      user.setFullName(data.fullName);
    }

    if (data.emailComfirm != undefined) {
      user.setEmailConfirm(data.emailComfirm);
    }

    const userUpdated = await this.repository.update(user);

    return UserMapper.toDTO(userUpdated);
  }
}
