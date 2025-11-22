import { z } from "zod";

export const groundGetSchema = z.object({
  body: z.object({
    page: z.coerce.number().positive().default(1),
    limit: z.coerce.number().positive().default(10),
  }),
});

export const groundGetOneSchema = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),
});
