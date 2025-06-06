import { z } from "zod";

/**
 * CREATE
 */
export const cattleBasicSchema = z.object({
  body: z.object({
    data: z.object({
      description: z
        .string({
          required_error: "Description is required",
        })
        .trim()
        .min(1),
      father: z.number().optional(),
      mother: z.number().optional(),
      gender: z.enum(["male", "female"]).optional().default("male"),
      registrationNumber: z
        .string({
          required_error: "Registration number is required",
        })
        .trim()
        .min(8)
        .max(15),
      lotNumber: z
        .string({ required_error: "Lot number is required" })
        .trim()
        .min(6)
        .max(12),
      color: z
        .string({ required_error: "Color is required" })
        .trim()
        .min(1)
        .max(50),
      birthdate: z.date({ required_error: "Birthdate is required" }),
      observations: z.string().optional(),
      reason_for_withdrawal: z.string().optional(),
      status: z.number().min(0).max(1).optional(),
      id_iron: z.number({ required_error: "Iron is required" }).positive(),
      id_race: z.number({ required_error: "Race is required" }).positive(),
      id_ground: z.number({ required_error: "Ground is required" }).positive(),
    }),
  }),
});

export type CattleBodyType = z.infer<typeof cattleBasicSchema>["body"];
