"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  tech_stack: string;
  github_url: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Lock scroll when modal open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
  }

  return (
    <section
      id="projects"
      className="py-24 px-8 md:px-20 bg-black text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          My <span className="text-purple-500">Recent Works</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(project)}
              className="relative group overflow-hidden rounded-2xl border border-gray-800 hover:border-purple-500 transition cursor-pointer"
            >
              {/* Image */}
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-72 object-cover rounded-2xl transition duration-700 group-hover:scale-110 group-hover:brightness-50"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-8">
                <span className="inline-block text-xs px-3 py-1 bg-purple-600/80 rounded-full mb-3 w-fit">
                  {project.category}
                </span>

                <h3 className="text-2xl font-semibold">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-300 mt-2">
                  {project.description.length > 120
                    ? project.description.slice(0, 120) + "..."
                    : project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech_stack
                    ?.split(",")
                    .slice(0, 4)
                    .map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-white/10 px-2 py-1 rounded-md"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111122] max-w-3xl w-full rounded-2xl border border-purple-500 p-8 overflow-y-auto max-h-[85vh] relative"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>

              {/* Image */}
              <img
                src={selectedProject.image_url}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />

              {/* Category */}
              <span className="inline-block text-xs px-3 py-1 bg-purple-600/80 rounded-full mb-4">
                {selectedProject.category}
              </span>

              {/* Title */}
              <h3 className="text-3xl font-bold mb-4">
                {selectedProject.title}
              </h3>

              {/* Full Description */}
              <p className="text-gray-300 leading-relaxed whitespace-pre-line mb-6">
                {selectedProject.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3 mb-6">
                {selectedProject.tech_stack
                  ?.split(",")
                  .map((tech, index) => (
                    <span
                      key={index}
                      className="text-sm bg-white/10 px-3 py-1 rounded-md"
                    >
                      {tech.trim()}
                    </span>
                  ))}
              </div>

              {/* Github */}
              {selectedProject.github_url && (
                <a
                  href={selectedProject.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition"
                >
                  View on GitHub →
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
