import { User } from "../models/User";
import { ErrorController } from "../utils/errors";
import { encrypt, compare } from "../utils/handleBcrypt";
import jwt from "jsonwebtoken";
import { RegisterType, LoginType } from "../schemas/auth.schema";
import { User as UserType } from "../types";

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

export const userUpdate = async (user: UserType) => {};

export const userDelete = async (id: number) => {};

export const userLogin = async (user: LoginType) => {
   const userFind = await userGetOneEmail(user.email);

   const isPasswordValid = await compare(user.password, userFind.password);
   if (!isPasswordValid) {
      throw new ErrorController({
         message: "Incorrect password o email",
         statusCode: 400,
      });
   }

   const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

   console.log(expiresIn);

   const payload = { id: userFind.id_user, email: userFind.email };
   const secret = process.env.JWT_SECRET || "default_secret"; // Usa la clave secreta del .env
   const token = jwt.sign(payload, secret, {
      expiresIn, // Tiempo de expiración
   });

   return {
      user: userFind,
      token,
   };
};
