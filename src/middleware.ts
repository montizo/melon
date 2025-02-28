import { checkRateLimit } from "@/utils/checkRateLimit";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("Request");

  if (req.method == "POST") {
    const isRateLimited = await checkRateLimit("POST", 100, 60);

    if (isRateLimited) {
      return NextResponse.json(
        { message: "Too many POST requests. Try again later.", success: false },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}
