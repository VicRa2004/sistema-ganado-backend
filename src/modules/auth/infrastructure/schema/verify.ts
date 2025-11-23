import { z } from "zod";

export const userParams = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),
});

export const tokenParams = z.object({
  params: z.object({
    token: z.string(),
  }),
});
