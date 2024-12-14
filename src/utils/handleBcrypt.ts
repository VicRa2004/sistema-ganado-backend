import bcryptjs from "bcryptjs";

export const encrypt = async (textPlain: string) => {
   const hash = await bcryptjs.hash(textPlain, 10);

   return hash;
};

export const compare = async (passwordPlain: string, hashPassword: string) => {
   return await bcryptjs.compare(passwordPlain, hashPassword);
};
