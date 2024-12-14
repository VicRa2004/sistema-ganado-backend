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

export const paramSchema = z.object({
   params: z.object({
      id: z.string({
         required_error: "ID is required",
      }),
   }),
});
