"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");

    if (!isAdmin) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("admin");
    router.push("/login");
  }

  if (loading) return null;

  return (
    <div className="min-h-screen flex bg-[#0b1120] text-white">

      {/* Sidebar */}
      <aside className="w-64 border-r border-purple-900/30 bg-[#0f172a] p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-xl font-bold text-purple-500 mb-6">
            Admin Panel
          </h2>

          <nav className="flex flex-col gap-2 text-sm">

            <Link
              href="/admin/projects"
              className={`px-3 py-2 rounded-lg transition ${
                pathname === "/admin/projects"
                  ? "bg-purple-600"
                  : "hover:bg-purple-500/10"
              }`}
            >
              Projects
            </Link>

            <Link
              href="/admin/skills"
              className={`px-3 py-2 rounded-lg transition ${
                pathname === "/admin/skills"
                  ? "bg-purple-600"
                  : "hover:bg-purple-500/10"
              }`}
            >
              Skills
            </Link>

            <Link
              href="/admin/services"
              className={`px-3 py-2 rounded-lg transition ${
                pathname === "/admin/services"
                  ? "bg-purple-600"
                  : "hover:bg-purple-500/10"
              }`}
            >
              Services
            </Link>

            <Link
              href="/admin/experience"
              className={`px-3 py-2 rounded-lg transition ${
                pathname === "/admin/experience"
                  ? "bg-purple-600"
                  : "hover:bg-purple-500/10"
              }`}
            >
              Experience
            </Link>

          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-red-400 text-sm hover:text-red-500 transition"
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10 bg-[#0b1120]">
        {children}
      </main>
    </div>
  );
}
