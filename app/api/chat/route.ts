import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({ message: "" }));
    const message = (body?.message ?? "").toString().slice(0, 2000);

    const reply = message
      ? `Echo: ${message}`
      : "Hello from ChatPT Atlas! Say something and I'll echo it.";

    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ reply: "Internal error" }, { status: 500 });
  }
}
