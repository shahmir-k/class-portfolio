import { supabaseAdmin } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("students")
    .select("*, projects(*)")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
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
  const { name, grade, bio, photo_url } = body;

  const { data, error } = await supabaseAdmin
    .from("students")
    .update({ name, grade, bio, photo_url })
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

  // Delete storage files for this student
  const { data: files } = await supabaseAdmin.storage
    .from("portfolio-assets")
    .list(`students/${id}`);

  if (files && files.length > 0) {
    await supabaseAdmin.storage
      .from("portfolio-assets")
      .remove(files.map((f) => `students/${id}/${f.name}`));
  }

  // Delete student (projects cascade automatically)
  const { error } = await supabaseAdmin
    .from("students")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
