import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().trim().min(1, { message: "Email is required" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .max(256, { message: "Password must be less than 256 characters" }),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().email().trim().min(1, { message: "Email is required" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(256, { message: "Password must be less than 256 characters" }),
});
