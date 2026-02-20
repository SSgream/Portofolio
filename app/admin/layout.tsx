import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#0b1120] text-white">

      {/* Sidebar */}
      <aside className="w-64 border-r border-blue-900/30 bg-[#0f172a] p-6 space-y-6">
        <h2 className="text-xl font-bold text-blue-500">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/admin/projects" className="hover:bg-blue-500/10 px-3 py-2 rounded-lg">
            Projects
          </Link>
          <Link href="/admin/skills" className="hover:bg-blue-500/10 px-3 py-2 rounded-lg">
            Skills
          </Link>
          <Link href="/admin/services" className="hover:bg-blue-500/10 px-3 py-2 rounded-lg">
            Services
          </Link>
          <Link href="/admin/experience" className="hover:bg-blue-500/10 px-3 py-2 rounded-lg">
            Experience
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10 bg-[#0b1120]">
        {children}
      </main>
    </div>
  );
}
