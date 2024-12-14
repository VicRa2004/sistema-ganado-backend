import { Request, Response } from "express";
import { LoginType, RegisterType } from "../schemas/auth.schema";
import { handleError } from "../utils/handleErrors";
import { userCreate, userLogin } from "../services/user.service";

export const login = async (
   req: Request<unknown, unknown, LoginType>,
   res: Response
) => {
   try {
      const { user, token } = await userLogin(req.body);

      // Responder con el token y datos del usuario
      res.status(200).json({
         data: {
            email: user.email,
            fullname: user.fullname,
            username: user.username,
            token, // Incluir el token en la respuesta
         },
         statusCode: 200,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

export const register = async (
   req: Request<unknown, unknown, RegisterType>,
   res: Response
) => {
   try {
      const data = { ...req.body };

      const newUser = await userCreate(data);

      res.status(200).json({
         statusCode: 200,
         data: {
            email: newUser.email,
            fullname: newUser.fullname,
            username: newUser.username,
         },
      });
   } catch (error) {
      handleError(error, req, res);
   }
};
