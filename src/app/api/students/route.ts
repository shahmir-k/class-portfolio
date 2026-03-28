import { supabaseAdmin } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search");
  const grade = request.nextUrl.searchParams.get("grade");

  let query = supabaseAdmin.from("students").select("*, projects(count)");

  if (search) {
    query = query.or(`name.ilike.%${search}%,bio.ilike.%${search}%`);
  }
  if (grade) {
    query = query.eq("grade", grade);
  }

  query = query.order("name");

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const students = data.map((s) => ({
    ...s,
    project_count: s.projects?.[0]?.count ?? 0,
    projects: undefined,
  }));

  return NextResponse.json(students);
}

export async function POST(request: Request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, grade, bio } = body;

  if (!name || !grade) {
    return NextResponse.json({ error: "Name and grade are required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("students")
    .insert({ name, grade, bio: bio || null })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
