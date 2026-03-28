"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar({ grades }: { grades: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [grade, setGrade] = useState(searchParams.get("grade") || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (grade) params.set("grade", grade);
      const query = params.toString();
      router.push(query ? `/?${query}` : "/");
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, grade, router]);

  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search students..."
        style={{ flex: 1 }}
      />
      <select
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        style={{ maxWidth: 180 }}
      >
        <option value="">All Grades</option>
        {grades.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
    </div>
  );
}
