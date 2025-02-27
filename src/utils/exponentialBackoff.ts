import redis from "@/lib/db/redis";
import { headers } from "next/headers";

export default async function exponentialBackoff(
  message: string,
  maxRetries: number = 5,
  resetAfter: number,
  baseDelay = 1000
) {
  const header = await headers();

  const ip =
    process.env.NODE_ENV === "production"
      ? (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0]
      : "127.0.0.1";

  const key = `exponential-backoff:${ip}`;

  const retries = parseInt((await redis.get(`${key}:retries`)) ?? "0") || 0;
  const lastAttempt = await redis.get(`${key}:last_attempt`);

  const now = Date.now();

  if (lastAttempt && now - parseInt(lastAttempt, 10) > resetAfter) {
    await redis.set(`${key}:retries`, 0);
    await redis.set(`${key}:last_attempt`, now.toString());
    return { message: "Continue action", success: true };
  }

  if (retries >= maxRetries) {
    return { message: message, success: false };
  }

  const delay = baseDelay * Math.pow(2, retries);

  await redis.incr(`${key}:retries`);
  await redis.set(`${key}:last_attempt`, now.toString());

  return { message: "Continue action", success: true };
}
