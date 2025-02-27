"use server";

import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import prisma from "@/lib/db/prisma/prisma";
import { passwordSchema } from "@/lib/validation";
import { checkRateLimit } from "@/utils/checkRateLimit";
import bcrypt from "bcryptjs";

export default async function changePasswordAction(
  _: any,
  formData: FormData
): Promise<{ message: string; success: boolean }> {
  const { isRateLimited } = await checkRateLimit("POST", 100, 60);

  if (isRateLimited) {
    return {
      message: "Too many POST requests. Try again later.",
      success: false,
    };
  }

  const newPassword = formData.get("newpassword");
  const confirmPassword = formData.get("confirmpassword");

  if (typeof newPassword !== "string" || typeof confirmPassword !== "string") {
    return { message: "Invalid input fields", success: false };
  }

  if (newPassword !== confirmPassword) {
    return { message: "Passwords do not match", success: false };
  }
  if (
    passwordSchema.safeParse(newPassword).success === false ||
    passwordSchema.safeParse(confirmPassword).success === false
  ) {
    return { message: "Invalid password", success: false };
  }

  const session = await getCurrentSession();
  if (session.userId === null) {
    return { message: "User not found", success: false };
  }

  const user = await getUserById(session.userId);
  if (user === null || user.id === null) {
    return { message: "User not found", success: false };
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: passwordHash,
    },
  });

  console.log(newPassword, confirmPassword);

  return { message: "Passwor changed successful", success: true };
}
