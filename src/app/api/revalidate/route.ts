import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: "Revalidation secret is not configured" },
      { status: 500 },
    );
  }

  const headerSecret = request.headers.get("x-sanity-webhook-secret");
  const querySecret = request.nextUrl.searchParams.get("secret");

  if (headerSecret !== secret && querySecret !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("products", "max");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
