"use server";

import { setSessionCookie } from "@/lib/auth/session";
import { getUserByEmail } from "@/lib/auth/user";
import { emailSchema, passwordSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";

export default async function loginAction(_: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { message: "Invalid input fields", success: false };
  }

  if (emailSchema.safeParse(email).success === false) {
    return { message: "Invalid email", success: false };
  }
  if (passwordSchema.safeParse(password).success === false) {
    return { message: "Invalid password", success: false };
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
