import { supabaseAdmin } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const studentId = request.nextUrl.searchParams.get("student_id");
  const tech = request.nextUrl.searchParams.get("tech");

  let query = supabaseAdmin.from("projects").select("*");

  if (studentId) {
    query = query.eq("student_id", studentId);
  }
  if (tech) {
    query = query.contains("tech_stack", [tech]);
  }

  query = query.order("display_order").order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { student_id, title, description, url, tech_stack } = body;

  if (!student_id || !title) {
    return NextResponse.json({ error: "student_id and title are required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("projects")
    .insert({
      student_id,
      title,
      description: description || null,
      url: url || null,
      tech_stack: tech_stack || [],
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
