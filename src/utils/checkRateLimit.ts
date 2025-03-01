"use server";

import { headers } from "next/headers";
import rateLimit from "./rateLimit";

export async function checkRateLimit(
  method: "GET" | "POST",
  limit: number = 100,
  windowSeconds: number = 60
): Promise<boolean> {
  const header = await headers();

  const ip =
    process.env.NODE_ENV === "production"
      ? (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0]
      : "127.0.0.1";

  const rateLimitResult = await rateLimit(ip, method, limit, windowSeconds);

  if (!rateLimitResult) {
    return true;
  }

  return false;
}
