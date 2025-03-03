"use server";

import prisma from "@/lib/db/prisma/prisma";
import { setSessionCookie } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { getIpAddress } from "../../utils";

export default async function forgotPasswordCodeAction(code: string) {
  const user = await prisma.user.findFirst({
    where: { forgotPasswordLink: code.toLowerCase() },
  });

  if (!user?.id) {
    redirect("/");
  }

  await prisma.user.updateMany({
    where: { forgotPasswordLink: code },
    data: { forgotPasswordLink: null },
  });

  await setSessionCookie(user.id, await getIpAddress());

  redirect("/settings/account");
}
