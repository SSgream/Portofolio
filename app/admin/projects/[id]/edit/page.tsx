"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  useEffect(() => {
    fetchProject();
  }, []);

  async function fetchProject() {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      setTitle(data.title);
      setCategory(data.category);
      setDescription(data.description);
      setTechStack(data.tech_stack);
      setGithubUrl(data.github_url);
    }
  }

  async function handleUpdate() {
    await supabase
      .from("projects")
      .update({
        title,
        category,
        description,
        tech_stack: techStack,
        github_url: githubUrl,
      })
      .eq("id", id);

    router.push(`/admin/projects/${id}`);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Edit Project</h1>

      <input
        className="w-full p-3 bg-black border border-gray-700 rounded-lg"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full p-3 bg-black border border-gray-700 rounded-lg"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        className="w-full p-3 bg-black border border-gray-700 rounded-lg"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="w-full p-3 bg-black border border-gray-700 rounded-lg"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
      />

      <input
        className="w-full p-3 bg-black border border-gray-700 rounded-lg"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
      />

      <button
        onClick={handleUpdate}
        className="bg-purple-600 px-6 py-3 rounded-lg"
      >
        Update Project
      </button>
    </div>
  );
}
