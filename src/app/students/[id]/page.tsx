import { supabaseAdmin } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import Footer from "@/components/Footer";
import PublicNav from "@/components/PublicNav";
import type { Project } from "@/types";

export default async function StudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: student, error } = await supabaseAdmin
    .from("students")
    .select("*, projects(*)")
    .eq("id", id)
    .order("display_order", { referencedTable: "projects" })
    .single();

  if (error || !student) {
    notFound();
  }

  const projectCount = student.projects?.length ?? 0;

  return (
    <>
      <PublicNav />

      {/* Hero */}
      <div className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www.ct839.com/_astro/hero-vex-worlds.DBZqm-94_13JxUN.webp"
          alt=""
          className="hero-bg-image"
          aria-hidden="true"
        />
        <div className="hero-inner" style={{ paddingTop: 96, paddingBottom: 56 }}>
          <div className="container">
            <Link href="/" style={{ color: "var(--brand-yellow)", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.5 8h-9M7.5 4l-4 4 4 4"/></svg>
              Back to all students
            </Link>

            <div style={{ display: "flex", gap: 28, marginTop: 28, alignItems: "center" }}>
              {student.photo_url ? (
                <img
                  src={student.photo_url}
                  alt={student.name}
                  className="avatar"
                  style={{ width: 110, height: 110, border: "3px solid var(--brand-yellow)" }}
                />
              ) : (
                <div className="avatar-placeholder" style={{
                  width: 110, height: 110, fontSize: 44, flexShrink: 0,
                  background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)",
                }}>
                  {student.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h1 style={{ fontSize: 40, letterSpacing: "-1px" }}>{student.name}</h1>
                <p style={{ fontSize: 16, marginTop: 6 }}>{student.grade}</p>
                {student.bio && <p style={{ fontSize: 15, marginTop: 10, maxWidth: 480 }}>{student.bio}</p>}
                <div className="hero-subtitle" style={{ marginTop: 16 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  {projectCount} project{projectCount !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="section section-white">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              Projects
            </div>
            <h2>Work by {student.name}</h2>
            <p>Browse the projects this student has created throughout the semester.</p>
          </div>

          <div className="grid grid-2">
            {student.projects?.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {projectCount === 0 && (
            <p className="text-muted mt-md">No projects yet.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
