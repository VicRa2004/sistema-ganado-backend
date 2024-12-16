import { ErrorSesion } from "./errors";

export const verifyUser = (idUser: number | undefined) => {
   if (!idUser) {
      throw new ErrorSesion();
   }

   return idUser;
};
