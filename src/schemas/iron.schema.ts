import { z } from "zod";

/**
 * CREATE
 */
export const ironBasicSchema = z.object({
   body: z.object({
      name: z
         .string({
            required_error: "Name is required",
         })
         .trim()
         .min(1),
   }),
});

export type IronBodyType = z.infer<typeof ironBasicSchema>["body"];
