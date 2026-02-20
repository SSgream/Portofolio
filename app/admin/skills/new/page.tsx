"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewSkill() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [icon, setIcon] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await supabase.from("skills").insert([
      {
        name,
        level: Number(level),
        icon,
      },
    ]);

    router.push("/admin/skills");
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Add Skill</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-[#111122] border border-gray-700 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Level</label>
          <input
            type="number"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-2 bg-[#111122] border border-gray-700 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Icon URL</label>
          <input
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full p-2 bg-[#111122] border border-gray-700 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 px-4 py-2 rounded-lg w-full hover:bg-purple-700 transition"
        >
          Save Skill
        </button>
      </form>
    </div>
  );
}
