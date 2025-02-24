import { z } from "zod";

export const usernameShema = z
  .string()
  .min(5, "Username must be at least 5 character")
  .max(30, "Username must be less than 30 characters")
  .regex(
    /^[A-Za-z0-9-_]+$/,
    "Username can only contain letters, numbers, -, and _"
  );

export const emailSchema = z
  .string()
  .regex(/.+@[^@]+\.[^@]+$/, "Must provide valid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters")
  .regex(/[a-z]/, "Password must have a lowercase letter")
  .regex(/[A-Z]/, "Password must have a uppercase letter")
  .regex(/\d/, "Password must have a one number");
