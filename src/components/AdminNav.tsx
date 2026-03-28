"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNav() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <nav className="nav">
      <Link href="/admin"><strong>Dashboard</strong></Link>
      <Link href="/admin/students">Students</Link>
      <Link href="/admin/students/new">Add Student</Link>
      <Link href="/admin/projects/new">Add Project</Link>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/">View Site</Link>
        <button onClick={handleLogout} className="btn-primary btn-small">
          Logout
        </button>
      </div>
    </nav>
  );
}
