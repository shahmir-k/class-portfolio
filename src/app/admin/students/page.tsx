"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import type { Student } from "@/types";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    await fetch(`/api/students/${deleteTarget.id}`, { method: "DELETE" });
    setDeleteTarget(null);
    fetchStudents();
  }

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1>Students</h1>
        <Link href="/admin/students/new" className="btn-primary btn-small">
          Add Student
        </Link>
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Grade</th>
              <th>Projects</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {student.photo_url ? (
                      <img src={student.photo_url} alt="" className="avatar" style={{ width: 36, height: 36 }} />
                    ) : (
                      <div className="avatar-placeholder" style={{ width: 36, height: 36, fontSize: 14 }}>
                        {student.name.charAt(0)}
                      </div>
                    )}
                    <span style={{ fontWeight: 600 }}>{student.name}</span>
                  </div>
                </td>
                <td>{student.grade}</td>
                <td>{student.project_count ?? 0}</td>
                <td style={{ textAlign: "right" }}>
                  <Link href={`/admin/students/${student.id}/edit`} style={{ fontWeight: 600, fontSize: 14, marginRight: 16 }}>
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(student)}
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
            {students.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: 48 }}>
                  <p className="text-muted">No students yet.</p>
                  <Link href="/admin/students/new" className="btn-primary btn-small mt-md" style={{ display: "inline-flex" }}>
                    Add your first student
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <DeleteConfirmDialog
          message={`Are you sure you want to delete ${deleteTarget.name}? This will also delete all their projects.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
