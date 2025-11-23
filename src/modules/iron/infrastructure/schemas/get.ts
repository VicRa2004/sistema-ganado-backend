import { z } from "zod";

export const ironGetAllSchema = z.object({
  query: z.object({
    page: z.coerce.number().positive().default(1),
    limit: z.coerce.number().positive().default(10),
  }),
});
