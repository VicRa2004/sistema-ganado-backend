import { User } from "../../domain/User";
import { UserDTO } from "../dtos/UserDTO";

export class UserMapper {
  static toDTO(user: User): UserDTO {
    return {
      id: user.getId(),
      fullName: user.getFullName(),
      userName: user.getUserName(),
      email: user.getEmail(),
      password: user.getPassword(),
      rol: user.getRol(),
      emailComfirm: user.isEmailConfirm(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };
  }
}
