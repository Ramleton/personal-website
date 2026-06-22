// app/api/check-status/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ isLive: false }, { status: 400 });
  }

  try {
    // Send a lightweight HEAD request instead of downloading the whole page
    const response = await fetch(url, {
      method: "HEAD", 
      signal: AbortSignal.timeout(4000), // Don't let a slow site freeze your portfolio
    });

    // If the status code is in the 200-399 range, the site is active
    return NextResponse.json({ isLive: response.ok });
  } catch (error) {
		console.error(error);
    // If the domain is down or times out, safely return false instead of crashing
    return NextResponse.json({ isLive: false });
  }
}