"use server";

import { ActionResult } from "@/app/types";
import { getUserByUsername } from "@/lib/auth/user";
import prisma from "@/lib/db/prisma/prisma";
import { checkRateLimit } from "@/utils/checkRateLimit";

export async function getProfileAction(
  username: string
): GetProfileActionResult {
  const user = await getUserByUsername(username);
  if (!user) {
    return { message: "User not found", success: false };
  }

  const { passwordHash: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

export type GetProfileActionResult = Promise<
  ActionResult | UserWithoutPassword
>;

export type UserWithoutPassword = {
  id: string;
  username: string;
  email: string;
  bio: string | null;
  verifyCode: string | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export async function setProfileBio(
  username: string,
  newText: string
): Promise<ActionResult> {
  await prisma.user.update({ where: { username }, data: { bio: newText } });
  return { message: "Successfully changed bio", success: true };
}
