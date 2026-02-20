"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetchExperience();
  }, []);

  async function fetchExperience() {
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .order("year", { ascending: false });

    if (!error) {
      setExperiences(data || []);
    }
  }

  return (
    <section
      id="experience"
      className="py-24 px-8 md:px-20 bg-[#0d0d14] text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-16">
        My <span className="text-purple-500">Journey</span>
      </h2>

      <div className="space-y-12 border-l border-purple-500/50 pl-8 relative">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Dot */}
            <div className="absolute -left-[34px] top-2 w-4 h-4 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>

            {/* Year */}
            <p className="text-purple-400 text-sm mb-1">
              {exp.year}
            </p>

            {/* Role */}
            <h3 className="text-xl font-semibold">
              {exp.role}
            </h3>

            {/* Company */}
            <p className="text-gray-400 mb-3">
              {exp.company}
            </p>

            {/* Description (bullet) */}
            {exp.description && (
              <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
                {exp.description
                  .split("\n")
                  .map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
