import { NextFunction, Request, Response } from "express";
import { verifyUser } from "../utils/verifyUser";
import { userGetOneId } from "../services/user.service";
import { handleError } from "../utils/handleErrors";
import { ErrorController } from "../utils/errors";

export const isAdminMiddleware = async (
   req: Request<unknown, unknown, unknown, unknown>,
   res: Response,
   next: NextFunction
) => {
   try {
      const idUser = verifyUser(req.user?.id);

      const user = await userGetOneId(idUser);

      if (user.rol === "admin") {
         next();
         return;
      }

      throw new ErrorController({ message: "Unauthorized", statusCode: 401 });
   } catch (error) {
      handleError(error, req, res);
   }
};
