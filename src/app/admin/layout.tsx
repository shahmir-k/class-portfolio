import AdminNav from "@/components/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AdminNav />
      <main style={{ padding: 32 }}>{children}</main>
    </div>
  );
}
