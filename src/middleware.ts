import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const rateLimitUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/rate-limit`;

  if (req.method === "POST" || req.method === "GET") {
    const rateLimitResponse = await fetch(rateLimitUrl, {
      method: req.method, // Use the same HTTP method (POST or GET)
    });

    if (rateLimitResponse.status === 429) {
      return NextResponse.json(
        {
          message: `Too many ${req.method} requests. Try again later.`,
          success: false,
        },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
