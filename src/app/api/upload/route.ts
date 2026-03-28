import { supabaseAdmin } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const type = formData.get("type") as string;
  const entityId = formData.get("entityId") as string;

  if (!file || !type || !entityId) {
    return NextResponse.json({ error: "file, type, and entityId are required" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop() || "jpg";

  let storagePath: string;
  let dbUpdate: { table: string; column: string };

  if (type === "student-photo") {
    storagePath = `students/${entityId}/photo.${ext}`;
    dbUpdate = { table: "students", column: "photo_url" };
  } else if (type === "project-screenshot") {
    storagePath = `projects/${entityId}/screenshot.${ext}`;
    dbUpdate = { table: "projects", column: "custom_screenshot_url" };
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const { error: uploadError } = await supabaseAdmin.storage
    .from("portfolio-assets")
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: urlData } = supabaseAdmin.storage
    .from("portfolio-assets")
    .getPublicUrl(storagePath);

  await supabaseAdmin
    .from(dbUpdate.table)
    .update({ [dbUpdate.column]: urlData.publicUrl })
    .eq("id", entityId);

  return NextResponse.json({ url: urlData.publicUrl });
}
