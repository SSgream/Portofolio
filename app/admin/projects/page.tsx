"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  tech_stack: string;
  github_url: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("project-image")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
  }

  async function uploadImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("project-image") // ✅ sesuai nama bucket
    .upload(fileName, file);

  if (error) {
    console.log("Upload error:", error);
    return null;
  }

  const { data } = supabase.storage
    .from("project-image") // ✅ sesuai nama bucket
    .getPublicUrl(fileName);

  return data.publicUrl;
}


  async function saveProject() {
    if (!title) return;

    setLoading(true);

    let uploadedImageUrl = imageUrl;

    if (imageFile) {
      const uploaded = await uploadImage(imageFile);
      if (uploaded) {
        uploadedImageUrl = uploaded;
      }
    }

    const payload = {
      title,
      category,
      description,
      image_url: uploadedImageUrl,
      tech_stack: techStack,
      github_url: githubUrl,
    };

    if (editingId) {
      await supabase.from("projects").update(payload).eq("id", editingId);

      setEditingId(null);
    } else {
      await supabase.from("projects").insert([payload]);
    }

    resetForm();
    await fetchProjects();
    setLoading(false);
  }

  async function deleteProject(id: string) {
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  }

  function resetForm() {
    setTitle("");
    setCategory("");
    setDescription("");
    setTechStack("");
    setGithubUrl("");
    setImageFile(null);
    setImageUrl("");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>

      {/* FORM */}
      <div className="bg-[#111122] p-6 rounded-xl mb-10 space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm text-gray-300">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded bg-black border border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm text-gray-300">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded bg-black border border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded bg-black border border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tech_stack" className="block text-sm text-gray-300">
            Tech Stack
          </label>
          <input
            id="tech_stack"
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="w-full p-3 rounded bg-black border border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="github_url" className="block text-sm text-gray-300">
            Github URL
          </label>
          <input
            id="github_url"
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full p-3 rounded bg-black border border-gray-700"
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div className="space-y-3">
          <div className="space-y-2">
            <label
              htmlFor="project-image"
              className="block text-sm text-gray-300"
            >
              Project Image
            </label>
            <input
              id="project-image"
              type="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  setImageUrl(URL.createObjectURL(file));
                }
              }}
              className="w-full p-3 rounded bg-black border border-gray-700"
            />
          </div>

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-40 h-28 object-cover rounded border border-gray-700"
            />
          )}
        </div>

        <button
          onClick={saveProject}
          disabled={loading}
          className="bg-purple-600 px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : editingId ? "Update Project" : "Add Project"}
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-[#111122] p-6 rounded-xl">
            <h3 className="text-lg font-semibold">{project.title}</h3>

            <p className="text-sm text-gray-400">{project.category}</p>

            <p className="text-sm mt-2">{project.description}</p>

            {project.image_url && (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-40 h-28 object-cover rounded mt-3"
              />
            )}

            <p className="text-xs text-purple-400 mt-2">{project.tech_stack}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  setEditingId(project.id);
                  setTitle(project.title || "");
                  setCategory(project.category || "");
                  setDescription(project.description || "");
                  setTechStack(project.tech_stack || "");
                  setGithubUrl(project.github_url || "");
                  setImageUrl(project.image_url || "");
                }}
                className="text-yellow-400 hover:text-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProject(project.id)}
                className="text-red-400 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
