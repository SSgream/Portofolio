"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  category: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, category")
      .order("created_at", { ascending: false });

    if (!error && data) setProjects(data);
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (!error) {
      setProjects(projects.filter((project) => project.id !== id));
    } else {
      alert("Failed to delete project");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Projects</h1>

        <Link
          href="/admin/projects/new"
          className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg transition"
        >
          + Add Project
        </Link>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#111122] border border-gray-800 rounded-xl p-5 hover:border-purple-600 hover:bg-[#1a1a2e] transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {project.category}
                </p>
              </div>

              <div className="flex gap-3">
                {/* View */}
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="text-purple-400 hover:underline text-sm"
                >
                  View
                </Link>

                {/* Edit */}
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="text-blue-400 hover:underline text-sm"
                >
                  Edit
                </Link>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-400 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
