import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string(),
    userName: z.string(),
    password: z.string(),
    email: z.string(),
    rol: z.enum(["ADMIN", "USER"]),
  }),
});
