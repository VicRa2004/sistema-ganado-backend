import { UserRol } from "../../domain/UserRol";

export interface UserCreateDTO {
  fullName: string;
  userName: string;
  password: string;
  email: string;
  rol: UserRol;
}
