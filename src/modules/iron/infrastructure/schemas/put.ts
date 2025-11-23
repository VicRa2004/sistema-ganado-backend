import { z } from "zod";

export const ironUpdateSchema = z.object({
  body: z.object({
    name: z.coerce.string(),
  }),
  params: z.object({
    id: z.coerce.number().positive(),
  }),
});
