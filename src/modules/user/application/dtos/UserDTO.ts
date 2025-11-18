import { UserRol } from "../../domain/UserRol";

export interface UserDTO {
  id: number;
  fullName: string;
  userName: string;
  password: string;
  email: string;
  rol: UserRol;
  emailComfirm: boolean;
  createdAt: Date;
  updatedAt: Date;
}
