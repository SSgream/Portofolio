"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Experience = {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
};

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [year, setYear] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const fetchExperience = async () => {
    const { data } = await supabase
      .from("experience")
      .select("*")
      .order("year", { ascending: false });

    setExperiences(data || []);
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const resetForm = () => {
    setYear("");
    setRole("");
    setCompany("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await supabase
        .from("experience")
        .update({ year, role, company, description })
        .eq("id", editingId);
    } else {
      await supabase
        .from("experience")
        .insert([{ year, role, company, description }]);
    }

    resetForm();
    setShowModal(false);
    fetchExperience();
  };

  const handleEdit = (exp: Experience) => {
    setYear(exp.year);
    setRole(exp.role);
    setCompany(exp.company);
    setDescription(exp.description);
    setEditingId(exp.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this experience?");
    if (!confirmDelete) return;

    await supabase.from("experience").delete().eq("id", id);
    fetchExperience();
  };

  return (
    <div className="p-6 max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Experience</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
        >
          + Add Experience
        </button>
      </div>

      {/* List */}
      <div className="space-y-12">
        {experiences.map((exp) => (
          <div key={exp.id} className="pt-6 border-gray-300 relative">
            {/* 3 Dots Button */}
            <div className="absolute right-0 top-6">
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === exp.id ? null : exp.id)
                }
                className="text-gray-500 hover:text-black text-xl px-2"
              >
                ⋮
              </button>

              {/* Dropdown */}
              {activeMenu === exp.id && (
                <div className="absolute right-0 mt-2 w-32 border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      handleEdit(exp);
                      setActiveMenu(null);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-300 hover:text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      handleDelete(exp.id);
                      setActiveMenu(null);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-300 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Header Row */}
            <div className="flex justify-between items-start pr-10">
              <div>
                <h3 className="text-xl font-semibold">{exp.company}</h3>
                <p className="text-lg font-medium">{exp.role}</p>
              </div>

              <span className="text-lg font-semibold">{exp.year}</span>
            </div>

            {/* Bullet Description */}
            <ul className="mt-4 space-y-2 list-disc pl-6 text-gray-700">
              {exp.description.split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#0f0f1a] w-full max-w-lg p-6 rounded-xl border border-gray-800 space-y-4">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Experience" : "Add Experience"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm">Year (Start - End)</label>
                <input
                  placeholder="2022 - 2024 / 2023 - Present"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-2 bg-[#111122] border border-gray-700 rounded focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Role</label>
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2 bg-[#111122] border border-gray-700 rounded focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Company</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-2 bg-[#111122] border border-gray-700 rounded focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 bg-[#111122] border border-gray-700 rounded focus:border-blue-500 outline-none"
                  required
                />
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
