"use server";

import { setSessionCookie } from "@/lib/auth/session";
import { getUserByEmail } from "@/lib/auth/user";
import bcrypt from "bcryptjs";

export default async function loginAction(_: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { message: "Invalid input fields", success: false };
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
