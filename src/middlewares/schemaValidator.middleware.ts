import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { handleError } from "../utils/handleErrors";

export const schemaValidation =
   (schema: AnyZodObject) =>
   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      console.log(req.body);
      try {
         // Validación del esquema
         schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
         });
         // Si pasa la validación, se llama a next()
         return next();
      } catch (error) {
         handleError(error, req, res);
      }
   };
