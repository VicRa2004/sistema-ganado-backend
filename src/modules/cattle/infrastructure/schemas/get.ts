import { z } from "zod";

export const cattleGetAllSchema = z.object({
  query: z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
    gender: z.enum(["male", "female"]).optional(),
    status: z.coerce.number().optional(),
    idRace: z.coerce.number().optional(),
    idGround: z.coerce.number().optional(),
    idFather: z.coerce.number().optional(),
    idMother: z.coerce.number().optional(),
  }),
});

export const cattleGetOneSchema = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),
});
