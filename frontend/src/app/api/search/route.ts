import { type NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/lib/api/search";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json({ articles: [], cars: [] });
  }

  const results = await searchContent(q, 5);

  return NextResponse.json(results, {
    headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=120" },
  });
}
