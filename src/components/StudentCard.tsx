import Link from "next/link";
import type { Student } from "@/types";

export default function StudentCard({ student }: { student: Student }) {
  return (
    <Link href={`/students/${student.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card" style={{ padding: 28, textAlign: "center" }}>
        {student.photo_url ? (
          <img
            src={student.photo_url}
            alt={student.name}
            className="avatar"
            style={{ width: 88, height: 88, border: "2px solid var(--border-warm)" }}
          />
        ) : (
          <div className="avatar-placeholder" style={{ width: 88, height: 88, fontSize: 32, margin: "0 auto" }}>
            {student.name.charAt(0).toUpperCase()}
          </div>
        )}
        <h3 style={{ marginTop: 16, marginBottom: 2 }}>{student.name}</h3>
        <p style={{ fontSize: 14, margin: 0, color: "var(--text-secondary)" }}>{student.grade}</p>
        {student.project_count !== undefined && (
          <p className="text-muted" style={{ fontSize: 13, marginTop: 8 }}>
            {student.project_count} project{student.project_count !== 1 ? "s" : ""}
          </p>
        )}
        <div className="link-arrow" style={{ justifyContent: "center", marginTop: 16, fontSize: 13 }}>
          View projects
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8h9M8.5 4l4 4-4 4"/></svg>
        </div>
      </div>
    </Link>
  );
}
