"use server";

import { emailSchema } from "@/lib/validation";
import { checkRateLimitWithBackoff, validateField } from "../_utils";
import { ActionResult } from "@/app/types";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { updateUserEmail } from "@/lib/auth/user";

export default async function changeEmailAction(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get("email");

  if (typeof email !== "string")
    return { success: false, message: "Invalid input field" };

  let error = validateField(email, emailSchema, "email");
  if (error) return error;

  error = await checkRateLimitWithBackoff(
    "Too many login attempts. Try again later"
  );
  if (error) return error;

  const session = await getCurrentSession();
  if (!session.userId) {
    redirect("/login");
  }

  const user = await updateUserEmail(session.userId, email);

  if (user.isVerified) {
    redirect("/");
  }
  redirect("/verify-email");
}
