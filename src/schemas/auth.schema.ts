import { z } from "zod";

export const loginSchema = z.object({
   body: z.object({
      password: z
         .string({ required_error: "Password is required" })
         .min(6, "Password too short"),
      email: z
         .string({ required_error: "Email is required" })
         .email("Write a correct email"),
   }),
});

// Tipo de dato del login
export type LoginType = z.infer<typeof loginSchema>["body"];

export const registerSchema = z.object({
   body: z.object({
      fullname: z
         .string({ required_error: "Fullname is required" })
         .max(255, "Solo se pueden escribir 255 caracteres"),
      password: z
         .string({ required_error: "Password is required" })
         .min(6, "Password too short"),
      username: z.string({ required_error: "Username is required" }),
      email: z
         .string({ required_error: "Email is required" })
         .email("Write a correct email"),
   }),
});

// Tipo de dato del login
export type RegisterType = z.infer<typeof registerSchema>["body"];
