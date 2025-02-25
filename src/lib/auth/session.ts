import crypto from "crypto";
import redis from "../db/redis";
import { cookies } from "next/headers";

export async function setSessionCookie(userId: string) {
  const sessionToken = await generateSessionToken();
  console.log("User id:", userId);
  const session = await createSession(sessionToken, userId);
  const cookieStore = await cookies();

  cookieStore.set("session", sessionToken, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: session.expiresAt,
  });
}

export async function getCurrentSession(): Promise<
  { message: string; userId: string } | { message: string; userId: null }
> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return { message: "No session found", userId: null };
  }

  const sessionData = await getSession(sessionCookie.value);

  if (!sessionData || !sessionData) {
    return { message: "Invalid session", userId: null };
  }

  return { message: "Session found", userId: sessionData.userId };
}

export async function generateSessionToken() {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
}

export async function createSession(sessionToken: string, userId: string) {
  const expiresAt = Date.now() + 60 * 60 * 24 * 30 * 1000;

  const session = {
    sessionToken,
    userId,
    expiresAt,
  };

  await redis.hset(`session:${sessionToken}`, {
    userId,
    token: sessionToken,
    expiresAt,
  });
  await redis.expireat(
    `session:${sessionToken}`,
    Math.floor(session.expiresAt / 1000)
  );

  return session;
}

export async function getSession(sessionToken: string) {
  const sessionData = await redis.hgetall(`session:${sessionToken}`);
  if (!sessionData || !sessionData.userId) {
    return null;
  }

  return {
    userId: sessionData.userId.toString(),
    token: sessionData.token.toString(),
    expiresAt: Number(sessionData.expiresAt),
  };
}
