import { z } from "zod";

export const raceUpdateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
  params: z.object({
    id: z.coerce.number().positive(),
  }),
});
