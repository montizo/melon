"use server";

import prisma from "@/lib/db/prisma/prisma";
import { setSessionCookie } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { getIpAddress } from "../../utils";

export default async function forgotPasswordCodeAction(code: string) {
  const user = await prisma.user.findFirst({
    where: { forgotPasswordLink: code },
  });

  if (!user?.id) {
    redirect("/");
  }

  await setSessionCookie(user.id, await getIpAddress());

  redirect("/settings/account");
}
