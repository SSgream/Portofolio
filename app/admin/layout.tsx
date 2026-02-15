"use client";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#0d0d14] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black p-6 space-y-6">
        <h1 className="text-xl font-bold">
          Admin<span className="text-purple-500">.</span>
        </h1>

        <nav className="space-y-4 text-sm">
          <Link href="/admin/projects" className="block hover:text-purple-400">
            Projects
          </Link>
          <Link href="/admin/services" className="block hover:text-purple-400">
            Services
          </Link>
          <Link href="/admin/skills" className="block hover:text-purple-400">
            Skills
          </Link>
          <Link href="/admin/experiences" className="block hover:text-purple-400">
            Experiences
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
