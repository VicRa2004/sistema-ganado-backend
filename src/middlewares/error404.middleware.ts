import { Request, Response, NextFunction } from "express";
import { ErrorController } from "../utils/errors";
import { handleError } from "../utils/handleErrors";

export const error404 = (req: Request, res: Response, next: NextFunction) => {
   try {
      throw new ErrorController({
         message: "Route no exists",
         statusCode: 404,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};
