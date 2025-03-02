"use server";

import { emailSchema } from "@/lib/validation";
import {
  authenticateUser,
  checkRateLimitWithBackoff,
  validateField,
} from "../utils";
import { ActionResult } from "@/app/types";
import { redirect } from "next/navigation";

export default async function forgotPasswordAction(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get("email");

  let error = validateField(email, emailSchema, "email");
  if (error) return error;

  error = await checkRateLimitWithBackoff(
    "Too many reset password attempts. Try again later"
  );
  if (error) return error;

  // send forgot-password code
  redirect("/");
}
