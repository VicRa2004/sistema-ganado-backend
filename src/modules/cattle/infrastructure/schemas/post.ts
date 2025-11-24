import { z } from "zod";

export const cattleCreateSchema = z.object({
  body: z.object({
    description: z.string(),
    gender: z.enum(["male", "female"]),
    registrationNumber: z.string(),
    lotNumber: z.string(),
    color: z.string(),
    birthdate: z.coerce.date(),
    observations: z.string(),
    reasonForWithdrawal: z.string(),
    status: z.coerce.boolean(),
    idFather: z.coerce.number().optional(),
    idMother: z.coerce.number().optional(),
    idIron: z.coerce.number().optional(),
    idRace: z.coerce.number().positive(),
    idGround: z.coerce.number().optional(),
  }),
});
