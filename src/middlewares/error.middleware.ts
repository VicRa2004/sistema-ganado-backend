import { Request, Response, NextFunction } from "express";
import { handleError } from "../utils/handleErrors";

// Middleware de manejo de errores
const errorHandler = (
   err: any,
   req: Request,
   res: Response,
   next: NextFunction
): void => {
   handleError(err, req, res);
};

export default errorHandler;
