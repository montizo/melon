"use server";

import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import prisma from "@/lib/db/prisma/prisma";
import { redirect } from "next/navigation";

export default async function verifyEmailAction(_: any, code: string) {
  const session = await getCurrentSession();
  if (session.userId === null) {
    return;
  }
  const user = await getUserById(session.userId);
  if (user === null) {
    return;
  }

  if (user.verifyCode !== code) {
    return new Error("Invalid code");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verifyCode: null,
    },
  });

  redirect("/");
}
