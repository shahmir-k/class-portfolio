import { supabaseAdmin } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: project, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <div className="container">
      <h1 className="mb-lg">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
