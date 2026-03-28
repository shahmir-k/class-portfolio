import { isAdmin } from "@/lib/auth";
import { generateThumbnail } from "@/lib/screenshot";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url, projectId } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  // If no projectId yet (preview mode), just return the microlink screenshot URL directly
  if (!projectId) {
    try {
      const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      const screenshotUrl = data.data?.screenshot?.url || null;
      return NextResponse.json({ thumbnail_url: screenshotUrl });
    } catch {
      return NextResponse.json({ thumbnail_url: null });
    }
  }

  const thumbnailUrl = await generateThumbnail(url, projectId);
  return NextResponse.json({ thumbnail_url: thumbnailUrl });
}
