import { UserRol } from "@/modules/user/domain/UserRol";

export interface AuthTokenPayloadDTO {
  id: number;
  email: string;
  rol: UserRol;
}
