import { User } from "@/modules/user/domain/User";
import { AuthLoginReponseDTO } from "../dtos/AuthLoginResponseDTO";
import { UserMapper } from "@/modules/user/application/mappers/UserMapper";

export class LoginMapper {
  static toDTO(user: User, token: string): AuthLoginReponseDTO {
    return {
      user: UserMapper.toDTO(user),
      token,
    };
  }
}
