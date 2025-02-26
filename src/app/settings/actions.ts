"use server";

import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import prisma from "@/lib/db/prisma/prisma";
import bcrypt from "bcryptjs";

export default async function settingsAction(
  _: any,
  formData: FormData
): Promise<{ message: string; success: boolean }> {
  const newPassword = formData.get("newpassword");
  const confirmPassword = formData.get("confirmpassword");

  if (typeof newPassword !== "string" || typeof confirmPassword !== "string") {
    return { message: "Invalid input fields", success: false };
  }

  if (newPassword !== confirmPassword) {
    return { message: "Passwords do not match", success: false };
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

  prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: passwordHash,
    },
  });

  console.log(newPassword, confirmPassword);

  return { message: "Passwor changed successful", success: true };
}
