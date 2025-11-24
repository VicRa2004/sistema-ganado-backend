import { z } from "zod";

export const raceGetOneSchema = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),
});
