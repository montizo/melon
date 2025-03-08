import { headers } from "next/headers";
import { ZodType } from "zod";
import { ActionResult } from "../types";
import exponentialBackoff from "@/utils/exponentialBackoff";
import { getUserByEmail, isEmailOrUsernameTaken } from "@/lib/auth/user";
import bcrypt from "bcryptjs";
import { setSessionCookie } from "@/lib/auth/session";

export async function getIpAddress(): Promise<string> {
  const reqHeaders = await headers();
  console.log(reqHeaders.get("x-forwarded-for"));
  return process.env.NODE_ENV === "production"
    ? (reqHeaders.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0]
    : "127.0.0.1";
}

export function validateField(
  value: unknown,
  schema: ZodType<any, any>,
  fieldName: string
): ActionResult | null {
  if (typeof value !== "string" || schema.safeParse(value).success === false) {
    return { message: `Invalide ${fieldName}`, success: false };
  }
  return null;
}

export async function checkRateLimitWithBackoff(
  message: string,
  attempts = 5,
  duration = 15 * 60 * 1000
): Promise<ActionResult | null> {
  const backoffResult = await exponentialBackoff(message, attempts, duration);
  if (!backoffResult.success) {
    return backoffResult;
  }
  return null;
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<ActionResult> {
  const user = await getUserByEmail(email);
  if (!user) return { message: "Invalid credentials", success: false };

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) return { message: "Invalid credentials", success: false };

  await setSessionCookie(user.id, await getIpAddress());
  return { message: "Login successful", success: true };
}

export async function isUniqueEmailOrUsername(
  email: string,
  username: string
): Promise<ActionResult | null> {
  const uniqueFields = await isEmailOrUsernameTaken(email, username);
  if (uniqueFields) {
    return { message: "Email or username already taken", success: false };
  }
  return null;
}
