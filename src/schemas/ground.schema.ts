import { z } from "zod";

/**
 * CREATE
 */
export const groundBasicSchema = z.object({
  body: z.object({
    data: z.object({
      name: z.string({
        required_error: "Name is required",
      }),
      length: z.number({
        required_error: "length is required",
      }),
      width: z.number({
        required_error: "width is required",
      }),
      address: z.string().optional(),
      notes: z.string().optional(),
    }),
  }),
});

export type GroundBodyType = z.infer<typeof groundBasicSchema>["body"];
