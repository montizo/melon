import redis from "@/lib/db/redis";

export default async function rateLimit(
  ip: string,
  method: "GET" | "POST",
  limit: number = 100,
  windowSeconds: number = 60
): Promise<boolean> {
  const key = `rate-limit:${method}:${ip}`;

  const attempts = await redis.get(key);
  const attemptCount = attempts ? parseInt(attempts, 10) : 0;

  if (attemptCount >= limit) {
    return false;
  }

  await redis.multi().incr(key).expire(key, windowSeconds).exec();

  return true;
}
