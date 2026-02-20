"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Skill = {
  id: string;
  name: string;
  level: string;
  icon: string;
};

const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [icon, setIcon] = useState("");

  const fetchSkills = async () => {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("name", { ascending: true });

    setSkills(data || []);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const resetForm = () => {
    setName("");
    setLevel("Beginner");
    setIcon("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await supabase
        .from("skills")
        .update({ name, level, icon })
        .eq("id", editingId);
    } else {
      await supabase.from("skills").insert([
        { name, level, icon },
      ]);
    }

    resetForm();
    setShowModal(false);
    fetchSkills();
  };

  const handleEdit = (skill: Skill) => {
    setName(skill.name);
    setLevel(skill.level);
    setIcon(skill.icon);
    setEditingId(skill.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this skill?");
    if (!confirmDelete) return;

    await supabase.from("skills").delete().eq("id", id);
    fetchSkills();
  };

  return (
    <div className="p-6 max-w-6xl space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Skills</h1>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
        >
          + Add Skill
        </button>
      </div>

      {/* Skills List */}
      <div className="space-y-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="relative bg-[#111827] border border-gray-800 p-4 rounded-xl hover:border-blue-500 transition"
          >
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">
                <div className="text-2xl">
                  {skill.icon}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {skill.level}
                  </p>
                </div>
              </div>

              {/* 3 Dots */}
              <div className="relative">
                <button
                  onClick={() =>
                    setActiveMenu(
                      activeMenu === skill.id ? null : skill.id
                    )
                  }
                  className="text-gray-400 hover:text-white text-xl px-2"
                >
                  ⋮
                </button>

                {activeMenu === skill.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-[#1f2937] border border-gray-700 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        handleEdit(skill);
                        setActiveMenu(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        handleDelete(skill.id);
                        setActiveMenu(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-700"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] w-full max-w-md p-6 rounded-xl border border-gray-800 space-y-4">

            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Skill" : "Add Skill"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block mb-1 text-sm">Icon</label>
                <input
                  placeholder="⚛ / 🐍 / 📊"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full p-2 bg-[#111827] border border-gray-700 rounded focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 bg-[#111827] border border-gray-700 rounded focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full p-2 bg-[#111827] border border-gray-700 rounded focus:border-blue-500 outline-none"
                >
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {editingId ? "Update" : "Save"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
