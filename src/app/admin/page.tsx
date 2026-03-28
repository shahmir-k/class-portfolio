import { supabaseAdmin } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const { count: studentCount } = await supabaseAdmin
    .from("students")
    .select("*", { count: "exact", head: true });

  const { count: projectCount } = await supabaseAdmin
    .from("projects")
    .select("*", { count: "exact", head: true });

  return (
    <div className="container">
      <h1 className="mb-lg">Dashboard</h1>
      <div style={{ display: "flex", gap: 20 }}>
        <div className="card" style={{ padding: 32, minWidth: 220 }}>
          <p className="text-muted" style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Students
          </p>
          <h2 style={{ marginTop: 8 }}>{studentCount ?? 0}</h2>
          <Link href="/admin/students" className="mt-md" style={{ display: "inline-block", fontSize: 14, fontWeight: 600, color: "var(--brand-dark)" }}>
            Manage &rarr;
          </Link>
        </div>
        <div className="card" style={{ padding: 32, minWidth: 220 }}>
          <p className="text-muted" style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Projects
          </p>
          <h2 style={{ marginTop: 8 }}>{projectCount ?? 0}</h2>
          <Link href="/admin/projects/new" className="mt-md" style={{ display: "inline-block", fontSize: 14, fontWeight: 600, color: "var(--brand-dark)" }}>
            Add New &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
