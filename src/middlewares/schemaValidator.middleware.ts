import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { handleError } from "../utils/handleErrors";

export const schemaValidation =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.body.data) {
        console.log(req.body);

        if (typeof req.body.data === "string") {
          req.body.data = JSON.parse(req.body.data);
        }

        console.log("Data body:");
      }

      // Validación del esquema
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      // Si pasa la validación, se llama a next()
      return next();
    } catch (error) {
      console.log("Aqui se origina el error");
      handleError(error, req, res);
    }
  };
