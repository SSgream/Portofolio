"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    year: "2023",
    role: "Frontend Developer",
    company: "Freelance",
  },
  {
    year: "2024",
    role: "Fullstack Developer",
    company: "Startup Project",
  },
  {
    year: "2025",
    role: "UI/UX + Web Engineer",
    company: "Personal Brand",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-8 md:px-20 bg-[#0d0d14] text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-16">
        My <span className="text-purple-500">Journey</span>
      </h2>

      <div className="space-y-10 border-l border-purple-500 pl-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -left-[34px] top-1 w-4 h-4 bg-purple-500 rounded-full"></div>

            <p className="text-purple-400 text-sm">{exp.year}</p>
            <h3 className="text-xl font-semibold">{exp.role}</h3>
            <p className="text-gray-400">{exp.company}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
