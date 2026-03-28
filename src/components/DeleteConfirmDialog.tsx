"use client";

interface DeleteConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmDialog({ message, onConfirm, onCancel }: DeleteConfirmDialogProps) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, backdropFilter: "blur(4px)",
    }}>
      <div style={{
        background: "var(--surface)", padding: 32, borderRadius: "var(--radius-lg)",
        maxWidth: 420, width: "90%", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}>
        <h3 style={{ marginBottom: 8 }}>Confirm Delete</h3>
        <p style={{ fontSize: 15, marginBottom: 24 }}>{message}</p>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onConfirm} className="btn-danger">
            Delete
          </button>
          <button onClick={onCancel} className="btn-outline btn-small">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
