import { Request, Response } from "express";
import { handleError } from "../utils/handleErrors";
import { userService } from "@services/user.service";
import type {
   LoginType,
   RegisterType,
   GetVerifySchema,
   SendEmailType,
} from "../schemas/auth.schema";
import { ErrorValidateEmail } from "@utils/errors";

const login = async (
   req: Request<unknown, unknown, LoginType>,
   res: Response
) => {
   try {
      const { user, token } = await userService.userLogin(req.body);

      if (!user.email_confirm) {
         throw new ErrorValidateEmail({
            statusCode: 401,
            message: "Email not verified",
         });
      }

      // Responder con el token y datos del usuario
      res.status(200).json({
         data: {
            id_user: user.id_user,
            email: user.email,
            fullname: user.fullname,
            username: user.username,
            token, // Incluir el token en la respuesta,
            rol: user.rol
         },
         status: 200,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

const register = async (
   req: Request<unknown, unknown, RegisterType>,
   res: Response
) => {
   try {
      const data = { ...req.body };

      const newUser = await userService.userCreate(data);

      res.status(200).json({
         status: 200,
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

const sendVerifyEmail = async (
   req: Request<unknown, unknown, SendEmailType>,
   res: Response
) => {
   try {
      const { email } = req.body;

      await userService.userSendConfirmEmail(email);

      res.status(200).json({
         status: 200,
         message: "Email send",
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

const verifyEmail = async (req: Request<GetVerifySchema>, res: Response) => {
   try {
      const { token } = req.params;

      await userService.userVerifyEmail(token);

      res.status(200).json({
         status: 200,
         message: "Email verified",
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

export const authController = {
   login,
   register,
   verifyEmail,
   sendVerifyEmail,
};
