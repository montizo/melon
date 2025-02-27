"use server";

import { ActionResult } from "@/app/types";
import { setSessionCookie } from "@/lib/auth/session";
import { getUserByEmail } from "@/lib/auth/user";
import { emailSchema } from "@/lib/validation";
import { checkRateLimit } from "@/utils/checkRateLimit";
import exponentialBackoff from "@/utils/exponentialBackoff";
import bcrypt from "bcryptjs";

export default async function loginAction(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const { isRateLimited } = await checkRateLimit("POST", 100, 60);

  if (isRateLimited) {
    return {
      message: "Too many POST requests. Try again later.",
      success: false,
    };
  }

  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { message: "Invalid input fields", success: false };
  }

  if (emailSchema.safeParse(email).success === false) {
    return { message: "Invalid email", success: false };
  }

  const message = "Too many login attempts. Try again later";

  const backoffResult = await exponentialBackoff(message, 5, 15 * 60 * 1000);

  console.log(backoffResult);

  if (!backoffResult.success) {
    console.log(backoffResult);
    return backoffResult;
  }

  const user = await getUserByEmail(email);
  if (user === null) {
    return { message: "Invalid credentials", success: false };
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return { message: "Invalid credentials", success: false };
  }

  await setSessionCookie(user.id);

  return { message: "Login successful", success: true };
}
