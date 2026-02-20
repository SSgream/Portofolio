import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ WAJIB await

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) return notFound();

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">
        {project.title}
      </h1>

      {project.image_url && (
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full max-h-96 object-cover rounded-xl"
        />
      )}

      <p className="text-gray-400">
        Category: {project.category}
      </p>

      <p>{project.description}</p>

      <p className="text-purple-400">
        Tech: {project.tech_stack}
      </p>

      {project.github_url && (
        <a
          href={project.github_url}
          target="_blank"
          className="text-purple-500 hover:underline"
        >
          Github →
        </a>
      )}
    </div>
  );
}
