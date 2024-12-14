import { z } from "zod";

/**
 * CREATE
 */
export const groundBasicSchema = z.object({
   body: z.object({
      name: z.string({
         required_error: "Name is required",
      }),
   }),
});

export type GroundBodyType = z.infer<typeof groundBasicSchema>["body"];
