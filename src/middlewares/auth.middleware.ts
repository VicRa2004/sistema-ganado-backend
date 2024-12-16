import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorSesion } from "../utils/errors";
import { handleError } from "../utils/handleErrors";
import { userGetOneId } from "../services/user.service";

export const authMiddleware = async (
   req: Request<unknown, unknown, unknown, unknown>,
   res: Response,
   next: NextFunction
) => {
   const token = req.headers.authorization?.split(" ")[1]; // El formato es "Bearer TOKEN"

   try {
      if (!token) {
         throw new ErrorSesion();
      }

      const secret = process.env.JWT_SECRET || "default_secret";

      console.log(token);

      const decoded = jwt.verify(token, secret);

      req.user = decoded as { id: number; email: string }; // Agrega los datos del token al objeto `req`

      const id_user = req.user.id;

      if (!id_user) {
         throw new ErrorSesion();
      }

      await userGetOneId(id_user);
      next();
   } catch (err) {
      handleError(err, req, res);
   }
};
