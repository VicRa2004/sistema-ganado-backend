import jwt from "jsonwebtoken";
import { vars } from "@config/vars";

const createToken = <T extends object>(data: T) => {
   const expiresIn = vars.jwtExpiresIn;

   const payload = JSON.parse(JSON.stringify(data));
   const secret = vars.jwtSecret;

   const token = jwt.sign(payload, secret, {
      expiresIn, // Tiempo de expiración
   });

   return token;
};

const verifyToken = <T extends object>(token: string) => {
   const secret = vars.jwtSecret;
   const decoded = jwt.verify(token, secret);

   return decoded as T;
};

export const jwtOperations = { createToken, verifyToken };
