import { UserDTO } from "@/modules/user/application/dtos/UserDTO";

export interface AuthLoginReponseDTO {
  user: UserDTO;
  token: string;
}
