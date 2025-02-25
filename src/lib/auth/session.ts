import crypto from "crypto";
import redis from "../db/redis";
import { cookies } from "next/headers";

export async function setSessionCookie(userId: string) {
  const sessionToken = await generateSessionToken();
  const session = await createSession(sessionToken, userId);
  const cookieStore = await cookies();

  cookieStore.set("session", sessionToken, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: session.expiresAt,
  });
}

export async function generateSessionToken() {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
}

export async function createSession(token: string, userId: string) {
  const expiresAt = Date.now() + 60 * 60 * 24 * 30 * 1000;

  const session = {
    token,
    userId,
    expiresAt,
  };

  await redis.hset(`session:${session.token}`, {
    token: session.token,
    userId: session.userId,
    expiresAt: session.expiresAt,
  });
  await redis.expireat(
    `session:${session.token}`,
    Math.floor(session.expiresAt / 1000)
  );
  await redis.sadd(`user_sessions:${userId}`, session.token);

  return session;
}
