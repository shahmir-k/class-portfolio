"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  currentUrl?: string | null;
  onUpload: (file: File) => void;
  label?: string;
}

export default function ImageUpload({ currentUrl, onUpload, label = "Upload Image" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onUpload(file);
  }

  return (
    <div className="mb-lg">
      <label>{label}</label>
      <div className="mt-sm">
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: 120, height: 120, objectFit: "cover",
              borderRadius: "var(--radius)", marginBottom: 12, display: "block",
              border: "1px solid var(--border)",
            }}
          />
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "block", fontSize: 14 }}
        />
      </div>
    </div>
  );
}
