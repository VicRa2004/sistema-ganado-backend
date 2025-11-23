import { z } from "zod";

export const ironGetAllSchema = z.object({
  query: z.object({
    page: z.coerce.number().positive().default(1),
    limit: z.coerce.number().positive().default(10),
  }),
});

export const ironGetOneSchema = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),
});
