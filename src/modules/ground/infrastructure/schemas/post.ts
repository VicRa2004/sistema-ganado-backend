import { z } from "zod";

export const groundCreateSchema = z.object({
  body: z.object({
    name: z.string(),
    width: z.coerce.number().positive(),
    length: z.coerce.number().positive(),
    address: z.string(),
    notes: z.string(),
  }),
});
