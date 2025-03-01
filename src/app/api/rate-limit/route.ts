import { checkRateLimit } from "@/utils/checkRateLimit";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const isRateLimited = await checkRateLimit("POST", 100, 60);

  if (isRateLimited) {
    return NextResponse.json(
      { message: "Too many POST requests. Try again later.", success: false },
      { status: 429 }
    );
  }

  return NextResponse.json({ message: "Request allowed", success: true });
}
