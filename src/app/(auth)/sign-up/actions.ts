"use server";

import { ActionResult } from "@/app/types";
import {
  getIpAddress,
  isUniqueEmailOrUsername,
  validateField,
} from "../_utils";
import { emailSchema, passwordSchema, usernameSchema } from "@/lib/validation";
import { createUser, isEmailOrUsernameTaken } from "@/lib/user";
import { setSessionCookie } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function signupAction(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  let error = validateField(username, usernameSchema, "username");
  if (error) return error;

  error = validateField(email, emailSchema, "email");
  if (error) return error;

  error = validateField(password, passwordSchema, "password");
  if (error) return error;

  error = await isUniqueEmailOrUsername(email as string, username as string);
  if (error) return error;

  const user = await createUser(
    username as string,
    email as string,
    password as string
  );
  await setSessionCookie(user.id, await getIpAddress());

  redirect("/verify-email");
}

export async function checkEmailNotTaken(email: string): Promise<boolean> {
  return await isEmailOrUsernameTaken(email, "");
}

export async function checkUsernameNotTaken(
  username: string
): Promise<boolean> {
  return await isEmailOrUsernameTaken("", username);
}
