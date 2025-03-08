"use server";

import { emailSchema } from "@/lib/validation";
import { checkRateLimitWithBackoff, validateField } from "../_utils";
import { ActionResult } from "@/app/types";
import prisma from "@/lib/db/prisma/prisma";
import crypto from "crypto";

export default async function forgotPasswordAction(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get("email");

  console.log(email);

  if (typeof email !== "string")
    return { message: "Invalid input", success: false };

  let error = validateField(email, emailSchema, "email");
  if (error) return error;

  error = await checkRateLimitWithBackoff(
    "Too many reset password attempts. Try again later"
  );
  if (error) return error;

  const link = crypto.randomBytes(64).toString("hex");

  await prisma.user.update({
    where: { email: email },
    data: {
      forgotPasswordLink: link,
      forgotPasswordExpiry: new Date(new Date().getTime() + 1000 * 60 * 15),
    },
  });

  return { message: "Successfully sent email", success: true };
}
