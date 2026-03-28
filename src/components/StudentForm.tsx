"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import type { Student } from "@/types";

interface StudentFormProps {
  student?: Student;
}

export default function StudentForm({ student }: StudentFormProps) {
  const router = useRouter();
  const [name, setName] = useState(student?.name || "");
  const [grade, setGrade] = useState(student?.grade || "");
  const [bio, setBio] = useState(student?.bio || "");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!student;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = isEdit ? `/api/students/${student.id}` : "/api/students";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, grade, bio }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save student");
      }

      const savedStudent = await res.json();

      if (photoFile) {
        const formData = new FormData();
        formData.append("file", photoFile);
        formData.append("type", "student-photo");
        formData.append("entityId", savedStudent.id);
        await fetch("/api/upload", { method: "POST", body: formData });
      }

      router.push("/admin/students");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 560 }}>
      <div className="mb-lg">
        <label htmlFor="name">Name *</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="mb-lg">
        <label htmlFor="grade">Grade *</label>
        <input
          id="grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
          placeholder="e.g. 9th, 10th, 11th, 12th"
        />
      </div>

      <div className="mb-lg">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
        />
      </div>

      <ImageUpload
        currentUrl={student?.photo_url}
        onUpload={setPhotoFile}
        label="Student Photo"
      />

      {error && <p style={{ color: "#ef4444", fontSize: 14, marginBottom: 16 }}>{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Saving..." : isEdit ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}
