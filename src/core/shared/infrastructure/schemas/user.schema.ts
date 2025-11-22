import { z } from "zod";

export const userSchema = z.object({
  user: z.object({
    id: z.number().positive(),
    email: z.string().email(),
    rol: z.enum(["USER", "ADMIN"]),
  }),
});
