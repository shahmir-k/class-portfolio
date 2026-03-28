import TechBadge from "./TechBadge";
import type { Project } from "@/types";

export default function ProjectCard({ project }: { project: Project }) {
  const thumbnail = project.custom_screenshot_url || project.thumbnail_url;

  return (
    <div className="card">
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={project.title}
          style={{ width: "100%", height: 200, objectFit: "cover" }}
        />
      ) : (
        <div style={{
          width: "100%", height: 200,
          background: "linear-gradient(135deg, var(--surface-warm) 0%, var(--background) 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: 8,
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>No preview</span>
        </div>
      )}
      <div style={{ padding: 20 }}>
        <h3 style={{ marginBottom: 8 }}>{project.title}</h3>
        {project.description && (
          <p style={{ fontSize: 14, marginBottom: 12, lineHeight: 1.6 }}>
            {project.description.length > 120
              ? project.description.slice(0, 120) + "..."
              : project.description}
          </p>
        )}
        {project.tech_stack.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            {project.tech_stack.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
        )}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow"
          >
            View Project
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8h9M8.5 4l4 4-4 4"/></svg>
          </a>
        )}
      </div>
    </div>
  );
}
