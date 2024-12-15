import { z } from "zod";

/**
 * CREATE
 */
export const raceBasicSchema = z.object({
   body: z.object({
      name: z.string({
         required_error: "Name is required",
      }),
      description: z.string({ required_error: "Description is required" }),
   }),
});

export type RaceBodyType = z.infer<typeof raceBasicSchema>["body"];
