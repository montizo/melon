"use server";

import { emailSchema } from "@/lib/validation";
import {
  authenticateUser,
  checkRateLimitWithBackoff,
  validateField,
} from "../utils";
import { ActionResult } from "@/app/types";
import { redirect } from "next/navigation";

export default async function loginAction(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get("email");
  const password = formData.get("password");

  let error = validateField(email, emailSchema, "email");
  if (error) return error;

  if (typeof password !== "string") {
    return { message: "Invalid input fields", success: false };
  }

  error = await checkRateLimitWithBackoff(
    "Too many login attempts. Try again later"
  );
  if (error) return error;

  await authenticateUser(email as string, password);
  redirect("/");
}
