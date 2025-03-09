"use server";

import generateRandomString from "@/utils/randomString";
import redis from "./db/redis";
import { cookies, headers } from "next/headers";

const SESSION_EXPIRY_DAYS = parseInt(
  process.env.SESSION_EXPIRY_DAYS || "30",
  10
);
const SESSION_EXPIRY_MS = SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

interface Session {
  sessionToken: string;
  userId: string;
  ipAddress: string;
  expiresAt: number;
}

export async function setSessionCookie(
  userId: string,
  ipAddress: string
): Promise<void> {
  const sessionToken = await generateSessionToken();
  const session = await createSession(sessionToken, userId, ipAddress);
  const cookieStore = await cookies();

  cookieStore.set("session", sessionToken, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: (session.expiresAt - Date.now()) / 1000,
  });
}

export async function deleteSessionCookie(): Promise<{
  message: string;
  success: boolean;
}> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return { message: "No session found", success: false };
  }

  cookieStore.delete("session");
  await redis.del(`session:${sessionCookie.value}`);

  return { message: "Session deleted successfully", success: true };
}

export async function getCurrentSession(): Promise<{
  message: string;
  userId: string | null;
}> {
  const cookieStore = await cookies();
  const reqHeaders = await headers();
  const sessionCookie = cookieStore.get("session");

  const ipAddress =
    process.env.NODE_ENV === "production"
      ? (reqHeaders.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0]
      : "127.0.0.1";

  if (!sessionCookie) {
    return { message: "No session found", userId: null };
  }

  const sessionData = await getSession(sessionCookie.value);

  if (!sessionData) {
    return { message: "Invalid session", userId: null };
  }

  if (sessionData.ipAddress !== ipAddress) {
    console.warn(
      `[SESSION] Hijacking attempt detected for user ${sessionData.userId}`
    );
    return { message: "Session validation failed", userId: null };
  }

  return { message: "Session found", userId: sessionData.userId };
}

export async function generateSessionToken(): Promise<string> {
  return generateRandomString(32);
}

export async function createSession(
  sessionToken: string,
  userId: string,
  ipAddress: string
): Promise<Session> {
  const expiresAt = Date.now() + SESSION_EXPIRY_MS;

  const session: Session = {
    sessionToken,
    userId,
    ipAddress,
    expiresAt,
  };

  await redis.hset(`session:${sessionToken}`, {
    userId,
    token: sessionToken,
    ipAddress,
    expiresAt: expiresAt.toString(),
  });

  await redis.expireat(`session:${sessionToken}`, Math.floor(expiresAt / 1000));

  return session;
}

export async function getSession(
  sessionToken: string
): Promise<Session | null> {
  const sessionData = await redis.hgetall(`session:${sessionToken}`);

  if (!sessionData || !sessionData.userId) {
    return null;
  }

  return {
    userId: sessionData.userId,
    sessionToken: sessionData.token,
    ipAddress: sessionData.ipAddress,
    expiresAt: Number(sessionData.expiresAt),
  };
}
