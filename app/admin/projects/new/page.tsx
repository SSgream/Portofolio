"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewProject() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function uploadImage(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("project-image")
      .upload(fileName, file);

    if (error) return null;

    const { data } = supabase.storage
      .from("project-image")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSubmit() {
    setLoading(true);

    let imageUrl = "";

    if (imageFile) {
      const uploaded = await uploadImage(imageFile);
      if (uploaded) imageUrl = uploaded;
    }

    await supabase.from("projects").insert([
      {
        title,
        category,
        description,
        tech_stack: techStack,
        github_url: githubUrl,
        image_url: imageUrl,
      },
    ]);

    router.push("/admin/projects");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Add New Project</h1>

      <input
        placeholder="Title"
        className="w-full p-3 bg-black border border-gray-700 rounded-lg"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Category"
        className="w-full p-3 bg-black border border-gray-700 rounded-lg"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full p-3 bg-black border border-gray-700 rounded-lg"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        placeholder="Tech Stack"
        className="w-full p-3 bg-black border border-gray-700 rounded-lg"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
      />

      <input
        placeholder="Github URL"
        className="w-full p-3 bg-black border border-gray-700 rounded-lg"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="w-full p-3 bg-black border border-gray-700 rounded-lg"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-purple-600 px-6 py-3 rounded-lg"
      >
        {loading ? "Saving..." : "Save Project"}
      </button>
    </div>
  );
}
