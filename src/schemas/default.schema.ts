import { z } from "zod";

/**
 * GET
 */
export const getAllSchema = z.object({
   query: z.object({
      page: z.string().optional(),
   }),
});

/**
 * GET ONE
 * DELETE
 */
export const paramIDSchema = z.object({
   params: z.object({
      id: z.string({
         required_error: "ID is required",
      }),
   }),
});
