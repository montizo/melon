"use server";

import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import prisma from "@/lib/db/prisma/prisma";
import { passwordSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { ActionResult } from "@/app/types";
import { redirect } from "next/navigation";

export default async function changePasswordAction(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const newPassword = formData.get("newpassword")?.toString();
  const confirmPassword = formData.get("confirmpassword")?.toString();

  if (!newPassword || !confirmPassword) {
    return { message: "Password fields are required", success: false };
  }

  if (newPassword !== confirmPassword) {
    return { message: "Passwords do not match", success: false };
  }

  if (!passwordSchema.safeParse(newPassword).success) {
    return { message: "Invalid password", success: false };
  }

  const session = await getCurrentSession();
  if (!session || !session.userId) {
    return { message: "User not found", success: false };
  }

  const user = await getUserById(session.userId);
  if (!user || !user.id) {
    return { message: "User not found", success: false };
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: passwordHash,
    },
  });

  redirect("/");
}
