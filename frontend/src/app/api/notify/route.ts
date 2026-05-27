import { NextRequest, NextResponse } from "next/server";

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!;
const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY!;
const WEBHOOK_SECRET = process.env.NOTIFY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  // Optional secret check
  if (WEBHOOK_SECRET) {
    const secret = req.headers.get("x-webhook-secret");
    if (secret?.trim() !== WEBHOOK_SECRET.trim()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (!ONESIGNAL_REST_API_KEY) {
    return NextResponse.json({ error: "OneSignal key not configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Only handle article publish events
  const event = body.event as string;
  if (event !== "entry.publish") {
    return NextResponse.json({ skipped: true, event });
  }

  const model = body.model as string;
  if (model !== "article") {
    return NextResponse.json({ skipped: true, model });
  }

  const entry = body.entry as Record<string, string> | undefined;
  if (!entry) {
    return NextResponse.json({ error: "No entry data" }, { status: 400 });
  }

  const title = entry.title_vi || entry.title_en || "Bài viết mới";
  const summary = entry.summary_vi || entry.summary_en || "TechDrive — Tin tức & Đánh giá ô tô";
  const slug = entry.slug || "";
  const url = slug ? `https://techdrive.vn/bai-viet/${slug}` : "https://techdrive.vn";

  const payload = {
    app_id: ONESIGNAL_APP_ID,
    included_segments: ["All"],
    headings: { vi: title, en: title },
    contents: { vi: summary, en: summary },
    url,
  };

  const res = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Key ${ONESIGNAL_REST_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("[notify] OneSignal error:", data);
    return NextResponse.json({ error: data }, { status: res.status });
  }

  return NextResponse.json({ ok: true, id: data.id });
}
