import { z } from "zod";

export const ironCreateSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});
