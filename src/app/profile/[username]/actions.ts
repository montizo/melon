import { ActionResult } from "@/app/types";
import { getUserByUsername } from "@/lib/auth/user";
import { checkRateLimit } from "@/utils/checkRateLimit";

export async function getProfileAction(
  username: string
): GetProfileActionResult {
  const { isRateLimited } = await checkRateLimit("POST", 100, 60);

  if (isRateLimited) {
    return {
      message: "Too many POST requests. Try again later.",
      success: false,
    };
  }

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
  verifyCode: string | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};
