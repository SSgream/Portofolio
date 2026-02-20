"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

interface Skill {
  id: string;
  name: string;
  level: string;
  icon: string;
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("name", { ascending: true });

    if (!error) {
      setSkills(data || []);
    }
  }

  return (
    <section className="py-24 px-8 md:px-20 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          My <span className="text-purple-500">Tech Stack</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.3 }}
              className="bg-[#111122] border border-gray-800 p-6 rounded-2xl text-center hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition"
            >

              {/* Name */}
              <h3 className="font-semibold text-lg">
                {skill.name}
              </h3>

              {/* Level */}
              <p className="text-sm text-purple-400 mt-2">
                {skill.level}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
