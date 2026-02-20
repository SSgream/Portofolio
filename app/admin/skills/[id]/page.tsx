import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SkillDetail(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const { data: skill } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id)
    .single();

  if (!skill) return notFound();

  return (
    <div className="p-6 space-y-6">
      <Link
        href="/admin/skills"
        className="text-sm text-gray-400 hover:text-white"
      >
        ← Back
      </Link>

      <h1 className="text-3xl font-bold">
        {skill.name}
      </h1>

      {skill.icon && (
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-16 h-16 object-contain"
        />
      )}

      <p className="text-lg">
        Level: {skill.level}
      </p>
    </div>
  );
}
