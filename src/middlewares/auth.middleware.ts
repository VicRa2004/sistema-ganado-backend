import { Request, Response, NextFunction } from "express";
import { ErrorSesion } from "../utils/errors";
import { handleError } from "../utils/handleErrors";
import { userService } from "../services/user.service";
import { jwtOperations } from "@utils/jwt";

export const authMiddleware = async (
   req: Request<unknown, unknown, unknown, unknown>,
   res: Response,
   next: NextFunction
) => {
   const token = req.headers.authorization?.split(" ")[1]; // El formato es "Bearer TOKEN"

   try {
      console.log(token);

      if (!token) {
         throw new ErrorSesion();
      }

      const decoded = jwtOperations.verifyToken<{ id: number; email: string }>(
         token
      );

      req.user = decoded; // Agrega los datos del token al objeto `req`

      const id_user = req.user.id;

      if (!id_user) {
         throw new ErrorSesion();
      }

      try {
         await userService.userGetOneId(id_user);
      } catch {
         throw new ErrorSesion();
      }
      next();
   } catch (err) {
      handleError(err, req, res);
   }
};
