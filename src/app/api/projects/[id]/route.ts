import { supabaseAdmin } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { title, description, url, tech_stack, thumbnail_url, custom_screenshot_url, display_order } = body;

  const updateData: Record<string, unknown> = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (url !== undefined) updateData.url = url;
  if (tech_stack !== undefined) updateData.tech_stack = tech_stack;
  if (thumbnail_url !== undefined) updateData.thumbnail_url = thumbnail_url;
  if (custom_screenshot_url !== undefined) updateData.custom_screenshot_url = custom_screenshot_url;
  if (display_order !== undefined) updateData.display_order = display_order;

  const { data, error } = await supabaseAdmin
    .from("projects")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Delete storage files for this project
  const { data: files } = await supabaseAdmin.storage
    .from("portfolio-assets")
    .list(`projects/${id}`);

  if (files && files.length > 0) {
    await supabaseAdmin.storage
      .from("portfolio-assets")
      .remove(files.map((f) => `projects/${id}/${f.name}`));
  }

  const { error } = await supabaseAdmin
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
