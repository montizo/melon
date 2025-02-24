"use server";

import { createUser, isEmailOrUsernameTaken } from "@/lib/auth/user";

export default async function signupAction(
  _: any,
  formData: FormData
): Promise<{ message: string; success: boolean }> {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    return { message: "Invalid input fields", success: false };
  }

  const uniqueFields = await isEmailOrUsernameTaken(email, username);
  if (uniqueFields) {
    return { message: "Email or username already taken", success: false };
  }

  const user = await createUser(username, email, password);

  return { message: "Sign up successful", success: true };
}
