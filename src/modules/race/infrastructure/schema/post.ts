import { z } from "zod";

export const raceCreateSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
  }),
});
