"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import TechBadge from "./TechBadge";
import type { Project, Student } from "@/types";

interface ProjectFormProps {
  project?: Project;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState(project?.student_id || "");
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [url, setUrl] = useState(project?.url || "");
  const [techStack, setTechStack] = useState<string[]>(project?.tech_stack || []);
  const [techInput, setTechInput] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(project?.custom_screenshot_url || project?.thumbnail_url || "");
  const [loading, setLoading] = useState(false);
  const [generatingThumb, setGeneratingThumb] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!project;

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then(setStudents);
  }, []);

  function addTech(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tech = techInput.trim();
      if (tech && !techStack.includes(tech)) {
        setTechStack([...techStack, tech]);
      }
      setTechInput("");
    }
  }

  function removeTech(tech: string) {
    setTechStack(techStack.filter((t) => t !== tech));
  }

  async function generateThumbnail() {
    if (!url) return;
    setGeneratingThumb(true);
    try {
      const res = await fetch("/api/screenshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, projectId: project?.id }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.thumbnail_url) {
          setThumbnailPreview(data.thumbnail_url);
        }
      }
    } catch {
      // thumbnail generation is best-effort
    }
    setGeneratingThumb(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiUrl = isEdit ? `/api/projects/${project.id}` : "/api/projects";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(apiUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          title,
          description,
          url,
          tech_stack: techStack,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save project");
      }

      const savedProject = await res.json();

      if (screenshotFile) {
        const formData = new FormData();
        formData.append("file", screenshotFile);
        formData.append("type", "project-screenshot");
        formData.append("entityId", savedProject.id);
        await fetch("/api/upload", { method: "POST", body: formData });
      }

      if (url && !screenshotFile && !isEdit) {
        fetch("/api/screenshot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, projectId: savedProject.id }),
        });
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
        <label htmlFor="student">Student *</label>
        <select
          id="student"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
          disabled={isEdit}
        >
          <option value="">Select a student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.name} ({s.grade})</option>
          ))}
        </select>
      </div>

      <div className="mb-lg">
        <label htmlFor="title">Title *</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="mb-lg">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div className="mb-lg">
        <label htmlFor="url">Project URL</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={generateThumbnail}
            disabled={!url || generatingThumb}
            className="btn-outline btn-small"
            style={{ whiteSpace: "nowrap", width: "auto" }}
          >
            {generatingThumb ? "Generating..." : "Preview"}
          </button>
        </div>
        {thumbnailPreview && (
          <img
            src={thumbnailPreview}
            alt="Thumbnail preview"
            style={{ marginTop: 12, maxWidth: 300, borderRadius: "var(--radius)", border: "1px solid var(--border)" }}
          />
        )}
      </div>

      <div className="mb-lg">
        <label htmlFor="techInput">Tech Stack</label>
        <input
          id="techInput"
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          onKeyDown={addTech}
          placeholder="Type a technology and press Enter"
        />
        <div className="mt-sm">
          {techStack.map((tech) => (
            <span key={tech} onClick={() => removeTech(tech)} style={{ cursor: "pointer" }} title="Click to remove">
              <TechBadge tech={tech} />
            </span>
          ))}
        </div>
      </div>

      <ImageUpload
        currentUrl={project?.custom_screenshot_url}
        onUpload={setScreenshotFile}
        label="Custom Screenshot (overrides auto-thumbnail)"
      />

      {error && <p style={{ color: "#ef4444", fontSize: 14, marginBottom: 16 }}>{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Saving..." : isEdit ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
}
