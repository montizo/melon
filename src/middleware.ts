import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.method === "POST") {
    const rateLimitResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/rate-limit`,
      {
        method: "POST",
      }
    );

    if (rateLimitResponse.status === 429) {
      return NextResponse.json(
        { message: "Too many POST requests. Try again later.", success: false },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
