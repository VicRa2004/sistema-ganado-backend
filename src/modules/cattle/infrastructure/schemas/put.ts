import { z } from "zod";

export const cattleUpdateSchema = z.object({
  body: z.object({
    description: z.string().optional(),
    gender: z.enum(["male", "female"]).optional(),
    registrationNumber: z.string().optional(),
    lotNumber: z.string().optional(),
    color: z.string().optional(),
    birthdate: z.coerce.date().optional(),
    observations: z.string().optional(),
    reasonForWithdrawal: z.string().optional(),
    status: z.coerce.boolean().optional(),
    idFather: z.coerce.number().optional(),
    idMother: z.coerce.number().optional(),
    idIron: z.coerce.number().optional(),
    idRace: z.coerce.number().positive(),
    idGround: z.coerce.number().optional(),
  }),
  params: z.object({
    id: z.coerce.number().positive(),
  }),
});
