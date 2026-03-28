"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import TechBadge from "@/components/TechBadge";
import type { Project } from "@/types";

interface ProjectWithStudent extends Project {
  student_name?: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectWithStudent[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<ProjectWithStudent | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const [projectsRes, studentsRes] = await Promise.all([
      fetch("/api/projects"),
      fetch("/api/students"),
    ]);
    const projectsData = await projectsRes.json();
    const studentsData = await studentsRes.json();

    const studentMap = new Map(studentsData.map((s: { id: string; name: string }) => [s.id, s.name]));

    setProjects(
      projectsData.map((p: Project) => ({
        ...p,
        student_name: studentMap.get(p.student_id) || "Unknown",
      }))
    );
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    await fetch(`/api/projects/${deleteTarget.id}`, { method: "DELETE" });
    setDeleteTarget(null);
    fetchProjects();
  }

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1>Projects</h1>
        <Link href="/admin/projects/new" className="btn-primary btn-small">
          Add Project
        </Link>
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Student</th>
              <th>Tech Stack</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {(project.custom_screenshot_url || project.thumbnail_url) ? (
                      <img
                        src={project.custom_screenshot_url || project.thumbnail_url || ""}
                        alt=""
                        style={{ width: 48, height: 32, objectFit: "cover", borderRadius: 4 }}
                      />
                    ) : (
                      <div style={{ width: 48, height: 32, background: "var(--surface-warm)", borderRadius: 4 }} />
                    )}
                    <span style={{ fontWeight: 600 }}>{project.title}</span>
                  </div>
                </td>
                <td>{project.student_name}</td>
                <td>
                  {project.tech_stack.map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </td>
                <td style={{ textAlign: "right" }}>
                  <Link href={`/admin/projects/${project.id}/edit`} style={{ fontWeight: 600, fontSize: 14, marginRight: 16 }}>
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(project)}
                    style={{
                      color: "#ef4444", background: "none", border: "none",
                      cursor: "pointer", fontWeight: 600, fontSize: 14, fontFamily: "inherit",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: 48 }}>
                  <p className="text-muted">No projects yet.</p>
                  <Link href="/admin/projects/new" className="btn-primary btn-small mt-md" style={{ display: "inline-flex" }}>
                    Add your first project
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <DeleteConfirmDialog
          message={`Are you sure you want to delete "${deleteTarget.title}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
