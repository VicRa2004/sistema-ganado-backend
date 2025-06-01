import { z } from "zod";

/**
 * GET
 */
export const getAllQueryCattleSchema = z.object({
  query: z.object({
    // Convertir "page" a número si está presente
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : undefined)),

    // "gender" ya es un string y no necesita transformación
    gender: z.enum(["male", "female"]).optional(),

    // Convertir "status" a número y validar que esté entre 0 y 1
    status: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : undefined))
      .refine((val) => val === undefined || (val >= 0 && val <= 1), {
        message: "El status debe ser 0 o 1",
      }),

    // Convertir "id_race" a número y validar que sea positivo
    id_race: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : undefined))
      .refine((val) => val === undefined || val > 0, {
        message: "El id_race debe ser un número positivo",
      }),

    // Convertir "id_iron" a número y validar que sea positivo
    id_iron: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : undefined))
      .refine((val) => val === undefined || val > 0, {
        message: "El id_iron debe ser un número positivo",
      }),
  }),
});

// Inferir el tipo correctamente
export type GetAllQueryCattleType = z.infer<
  typeof getAllQueryCattleSchema
>["query"];
