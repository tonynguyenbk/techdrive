import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email không hợp lệ" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  try {
    // Add to Resend Audience (if configured)
    if (AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        unsubscribed: false,
      });
    }

    // Send welcome email
    await resend.emails.send({
      from: "TechDrive <hello@techdrive.vn>",
      to: email,
      subject: "Chào mừng bạn đến với TechDrive!",
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #0F172A;">
          <div style="background: #DC2626; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">TechDrive</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 13px;">Tin tức & Đánh giá ô tô hàng đầu Việt Nam</p>
          </div>
          <div style="background: #fff; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #E2E8F0; border-top: none;">
            <h2 style="margin: 0 0 12px; font-size: 20px;">Đăng ký thành công! 🎉</h2>
            <p style="color: #334155; line-height: 1.7; margin: 0 0 20px;">
              Cảm ơn bạn đã đăng ký nhận bản tin của TechDrive. Từ nay bạn sẽ nhận được các bài viết mới nhất về:
            </p>
            <ul style="color: #334155; line-height: 2; padding-left: 20px; margin: 0 0 24px;">
              <li>Tin tức xe mới ra mắt tại Việt Nam</li>
              <li>Đánh giá chuyên sâu từ đội ngũ biên tập</li>
              <li>Bảng giá xe cập nhật hàng tháng</li>
              <li>So sánh và tư vấn chọn xe</li>
            </ul>
            <a href="https://techdrive.vn" style="display: inline-block; background: #DC2626; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px;">
              Khám phá TechDrive →
            </a>
          </div>
          <p style="text-align: center; color: #94A3B8; font-size: 11px; margin: 16px 0 0;">
            Bạn có thể hủy đăng ký bất cứ lúc nào. © 2026 TechDrive.vn
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[subscribe]", msg);
    // If already exists in audience, still return ok
    if (msg.includes("already exists")) {
      return NextResponse.json({ ok: true, note: "already_subscribed" });
    }
    return NextResponse.json({ error: "Không thể đăng ký. Thử lại sau." }, { status: 500 });
  }
}
