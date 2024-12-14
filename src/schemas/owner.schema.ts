import { z } from "zod";

/**
 * CREATE
 */

export const ownerBasicSchema = z.object({
   body: z.object({
      name: z.string({
         required_error: "Name is required",
      }),
   }),
});

export type OwnerBodyType = z.infer<typeof ownerBasicSchema>["body"];

/**
 * UPDATE
 */

export const ownerUpdateSchema = z.object({
   body: z.object({
      name: z.string({ required_error: "Name is required" }),
   }),
   params: z.object({
      id: z.string({
         required_error: "ID is required",
      }),
   }),
});
