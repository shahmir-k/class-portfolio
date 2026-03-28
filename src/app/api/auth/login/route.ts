import { createSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { passcode } = await request.json();

  if (passcode !== process.env.ADMIN_PASSCODE) {
    return NextResponse.json({ error: "Invalid passcode" }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ success: true });
}
