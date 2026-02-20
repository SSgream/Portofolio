"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Service = {
  id: string;
  title: string;
  description: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Fetch
  const fetchServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    setServices(data || []);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Open Add Modal
  const openAddModal = () => {
    setEditingService(null);
    setTitle("");
    setDescription("");
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (service: Service) => {
    setEditingService(service);
    setTitle(service.title);
    setDescription(service.description);
    setShowModal(true);
  };

  // Save (Add or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingService) {
      // Update
      await supabase
        .from("services")
        .update({
          title,
          description,
        })
        .eq("id", editingService.id);
    } else {
      // Insert
      await supabase.from("services").insert([
        {
          title,
          description,
        },
      ]);
    }

    setShowModal(false);
    setEditingService(null);
    setTitle("");
    setDescription("");
    fetchServices();
  };

  // Delete
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this service?");
    if (!confirmDelete) return;

    await supabase.from("services").delete().eq("id", id);
    fetchServices();
  };

  return (
    <div className="p-6 max-w-6xl space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Services</h1>

        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition"
        >
          + Add Service
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#111827] border border-blue-900/30 p-5 rounded-2xl shadow-lg shadow-black/30"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {service.description}
                </p>
              </div>

              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => openEditModal(service)}
                  className="text-blue-400 hover:text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(service.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111827] border border-blue-900/30 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              {editingService ? "Edit Service" : "Add Service"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 bg-[#0b1120] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 bg-[#0b1120] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-800 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                  {editingService ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
