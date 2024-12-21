import { vars } from "@config/vars";
import { User } from "../models/User";
import { ErrorController, ErrorValidateEmail } from "@utils/errors";
import { encrypt, compare } from "@utils/handleBcrypt";
import { emailService } from "./email.service";
import { jwtOperations } from "@utils/jwt";
import type { RegisterType, LoginType } from "../schemas/auth.schema";

interface UserGetAllData {
   page: number;
}

export const userGetAll = async ({ page }: UserGetAllData) => {
   const limitPages = 10;

   const users = await User.findAll({
      limit: limitPages,
      offset: limitPages * (page - 1),
   });

   return users;
};

export const userGetOneId = async (id: number) => {
   // Buscamos el usuario por medio del email
   const user = await User.findOne({
      where: {
         id_user: id,
      },
   });

   // Verificamos que el usuario exista
   if (!user) {
      throw new ErrorController({
         message: "User not found",
         statusCode: 400,
      });
   }

   return user;
};

export const userGetOneEmail = async (email: string) => {
   // Buscamos el usuario por medio del email
   const user = await User.findOne({
      where: {
         email,
      },
   });

   // Verificamos que el usuario exista
   if (!user) {
      throw new ErrorController({
         message: "Incorrect password o email",
         statusCode: 400,
      });
   }

   return user;
};

export const userCreate = async (user: RegisterType) => {
   const newPassword = await encrypt(user.password);

   const newUser = await User.create({
      ...user,
      password: newPassword,
      rol: "user",
   });

   return await newUser.save();
};

export const userLogin = async (user: LoginType) => {
   const userFind = await userGetOneEmail(user.email);

   const isPasswordValid = await compare(user.password, userFind.password);

   if (!isPasswordValid) {
      throw new ErrorController({
         message: "Incorrect password o email",
         statusCode: 400,
      });
   }

   const token = jwtOperations.createToken(userFind);

   return {
      user: userFind,
      token,
   };
};

// Enviamos el correo para confirmar el email
export const userSendConfirmEmail = async (email: string) => {
   const user = await userGetOneEmail(email);

   const token = jwtOperations.createToken({ email, id: user.id_user });
   const confirmationLink = `${vars.frontendUrl}/confirm-email?token=${token}`;

   const html = `
         <h1>Confirma tu email</h1>
         <p>Haz clic en el siguiente enlace para confirmar tu correo electrónico:</p>
         <a href="${confirmationLink}">Confirmar Email</a>
      `;

   await emailService.sendEmail({
      to: email,
      subject: "Confirma tu email",
      html,
   });
};

// Obtenemos el token de la ruta y verificamos que no halla caducado
export const userVerifyEmail = async (token: string) => {
   try {
      const decoded = jwtOperations.verifyToken<{ email: string; id: number }>(
         token
      );

      await User.update(
         { email_confirm: true },
         { where: { id_user: decoded.id } }
      );
   } catch {
      throw new ErrorValidateEmail({
         message: "El token de verificación es inválido o ha caducado",
         statusCode: 400,
      });
   }
};

/*
   Se debe de crear un metodo para solo actualizar un dato en
   especifico, como updatePassword y updateCorreo
 */

//export const userUpdate = async (user: UserType) => {};

// Por el momento no
//export const userDelete = async (id: number) => {};
