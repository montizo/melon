"use server";

import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import prisma from "@/lib/db/prisma/prisma";
import { error } from "console";
import { redirect } from "next/navigation";
import { checkRateLimitWithBackoff } from "../_utils";

export default async function verifyEmailAction(_: any, code: string) {
  const session = await getCurrentSession();
  if (session.userId === null) {
    return;
  }
  const user = await getUserById(session.userId);
  if (!user) return { error: "User not found" };
  if (user.isVerified) return { error: "Email already verified" };
  if (user.verifyCode !== code.toLowerCase()) return { error: "Invalid code" };

  const error = await checkRateLimitWithBackoff(
    "Too many verify email attempts. Try again later"
  );
  if (error) return error;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verifyCode: null,
    },
  });

  redirect("/");
}
