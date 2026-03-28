import { supabaseAdmin } from "@/lib/supabase/server";
import StudentCard from "@/components/StudentCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import Footer from "@/components/Footer";
import PublicNav from "@/components/PublicNav";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; grade?: string }>;
}) {
  const { search, grade } = await searchParams;

  let query = supabaseAdmin.from("students").select("*, projects(count)");

  if (search) {
    query = query.or(`name.ilike.%${search}%,bio.ilike.%${search}%`);
  }
  if (grade) {
    query = query.eq("grade", grade);
  }

  query = query.order("name");

  const { data } = await query;

  const students = (data || []).map((s) => ({
    ...s,
    project_count: s.projects?.[0]?.count ?? 0,
    projects: undefined,
  }));

  const { data: allStudents } = await supabaseAdmin
    .from("students")
    .select("grade");
  const grades = [...new Set((allStudents || []).map((s) => s.grade))].sort();

  const { count: totalProjects } = await supabaseAdmin
    .from("projects")
    .select("*", { count: "exact", head: true });

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
        <div className="hero-inner">
          <div className="container">
            <div className="section-tag section-tag-light mb-lg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.855z"/></svg>
              Student Portfolio
            </div>
            <h1 style={{ maxWidth: 600 }}>
              <span className="hero-h1-highlight">See What Our Students Have Built</span>
            </h1>
            <p style={{ marginTop: 16, maxWidth: 520, fontSize: 18 }}>
              A showcase of projects created by students across our robotics, coding, and engineering programs.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#students" className="btn-primary">
                Browse Students
                <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8h9M8.5 4l4 4-4 4"/></svg>
              </a>
              <Link href="/login" className="btn-outline-light">
                Admin Login
                <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8h9M8.5 4l4 4-4 4"/></svg>
              </Link>
            </div>
            <div className="hero-subtitle" style={{ marginTop: 32 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              {students.length} student{students.length !== 1 ? "s" : ""} &middot; {totalProjects ?? 0} project{(totalProjects ?? 0) !== 1 ? "s" : ""} showcased
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-bar-inner">
            <div className="stat-item">
              <div className="stat-number">{students.length}</div>
              <div className="stat-label">Students Showcased</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{totalProjects ?? 0}</div>
              <div className="stat-label">Projects Created</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{grades.length}</div>
              <div className="stat-label">Grade Levels</div>
            </div>
          </div>
          <p className="stats-subtitle">Showcasing the work of students across our programs.</p>
        </div>
      </div>

      {/* Student Grid */}
      <div className="section section-white" id="students">
        <div className="container">
          <div className="section-header section-header-center">
            <div className="section-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Students
            </div>
            <h2>Meet Our Students</h2>
            <p>Browse our talented students and explore the projects they have created throughout the semester.</p>
          </div>

          <SearchBar grades={grades} />

          <div className="grid grid-3">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>

          {students.length === 0 && (
            <p className="text-center text-muted mt-xl">
              No students found.
            </p>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="section-cta">
        <div className="container">
          <h2>Want to Join Our Programs?</h2>
          <p>Book an assessment and find out which pathway is right for your student. Our team will help match your child to the program where they will thrive.</p>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://www.ct839.com/en/book" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Book an Assessment
              <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8h9M8.5 4l4 4-4 4"/></svg>
            </a>
            <a href="https://www.ct839.com/en/programs" target="_blank" rel="noopener noreferrer" className="btn-outline-light">
              Explore Programs
              <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8h9M8.5 4l4 4-4 4"/></svg>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
