import { z } from "zod";

export const groundUpdateSchema = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),
  body: z.object({
    name: z.string().optional(),
    width: z.coerce.number().optional(),
    length: z.coerce.number().optional(),
    address: z.string().optional(),
    notes: z.string().optional(),
  }),
});
