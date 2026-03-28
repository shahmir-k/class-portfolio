const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  "React":      { bg: "#61DAFB", text: "#000" },
  "Next.js":    { bg: "#000000", text: "#FFF" },
  "JavaScript": { bg: "#F7DF1E", text: "#000" },
  "TypeScript": { bg: "#3178C6", text: "#FFF" },
  "Python":     { bg: "#3776AB", text: "#FFF" },
  "HTML":       { bg: "#E34F26", text: "#FFF" },
  "CSS":        { bg: "#1572B6", text: "#FFF" },
  "Node.js":    { bg: "#339933", text: "#FFF" },
  "Firebase":   { bg: "#FFCA28", text: "#000" },
  "Supabase":   { bg: "#3ECF8E", text: "#000" },
  "Tailwind":   { bg: "#06B6D4", text: "#FFF" },
  "Java":       { bg: "#ED8B00", text: "#FFF" },
  "C++":        { bg: "#00599C", text: "#FFF" },
  "Swift":      { bg: "#FA7343", text: "#FFF" },
};

const DEFAULT_COLOR = { bg: "var(--text-muted)", text: "#FFF" };

export default function TechBadge({ tech }: { tech: string }) {
  const color = BADGE_COLORS[tech] || DEFAULT_COLOR;

  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 9999,
      fontSize: 12,
      fontWeight: 600,
      background: color.bg,
      color: color.text,
      marginRight: 4,
      marginBottom: 4,
      lineHeight: "18px",
    }}>
      {tech}
    </span>
  );
}
