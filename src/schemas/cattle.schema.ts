import { string, z } from "zod";

/**
 * CREATE
 */
export const cattleBasicSchema = z.object({
   body: z.object({
      description: z
         .string({
            required_error: "Description is required",
         })
         .trim()
         .min(1),
      father: z.number().optional(),
      mother: z.number().optional(),
      gender: z.enum(["male", "female"]).optional().default("male"),
      registrationNumber: z.string().trim().min(8).max(15),
      lotNumber: z
         .string({ required_error: "Lot number is required" })
         .trim()
         .min(6)
         .max(12),
      color: string({ required_error: "Color is required" })
         .trim()
         .min(1)
         .max(50),
      birhtdate: z.date({ required_error: "Birhtdate is required" }),
      observations: z.string().optional(),
      reason_for_withdrawal: z.string().optional(),
      status: z.number().min(0).max(1).optional(),
      id_iron: z.number({ required_error: "Iron is required" }).positive(),
      id_race: z.number({ required_error: "Race is required" }).positive(),
      id_user: z.number({ required_error: "User is required" }).positive(),
   }),
});

export type CattleBodyType = z.infer<typeof cattleBasicSchema>["body"];
