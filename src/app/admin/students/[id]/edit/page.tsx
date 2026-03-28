import { supabaseAdmin } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import StudentForm from "@/components/StudentForm";

export default async function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: student, error } = await supabaseAdmin
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !student) {
    notFound();
  }

  return (
    <div className="container">
      <h1 className="mb-lg">Edit Student</h1>
      <StudentForm student={student} />
    </div>
  );
}
