"use server";

import prisma from "@/lib/db/prisma/prisma";
import { setSessionCookie } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { checkRateLimitWithBackoff, getIpAddress } from "../../_utils";
import { ActionResult } from "@/app/types";

export default async function forgotPasswordCodeAction(
  code: string
): Promise<ActionResult | null> {
  const error = await checkRateLimitWithBackoff(
    "Too many forgot-password attempts. Try again later"
  );
  if (error) return error;

  const user = await prisma.user.findFirst({
    where: { forgotPasswordLink: code.toLowerCase() },
  });

  if (!user?.id) {
    return { message: "Incorrect code", success: false };
  }

  if (
    user.forgotPasswordExpiry &&
    user.forgotPasswordExpiry.getTime() < Date.now()
  ) {
    await prisma.user.updateMany({
      where: { forgotPasswordLink: code },
      data: { forgotPasswordLink: null },
    });

    return { message: "Expired code", success: false };
  }

  await prisma.user.updateMany({
    where: { forgotPasswordLink: code },
    data: { forgotPasswordLink: null },
  });

  await setSessionCookie(user.id, await getIpAddress());

  redirect("/settings/account");
}
