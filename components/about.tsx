"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 px-8 md:px-20 bg-[#0d0d14] text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-16 items-center"
      >
        {/* IMAGE */}
        <div className="relative">
          <div className="absolute inset-0 bg-purple-600 blur-3xl opacity-20 rounded-full"></div>

          <img
            src="/foto_diri-.png"
            alt="About Me"
            className="relative w-60 ml-40 md:w-60 rounded-2xl shadow-2xl"
          />
        </div>

        {/* TEXT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About <span className="text-purple-500">Me</span>
          </h2>

          <p className="text-gray-400 leading-relaxed mb-6">
            I am a software developer with a strong interest in building
            reliable and scalable systems, from web applications and APIs to
            data-driven solutions. I enjoy turning complex problems into
            practical and efficient software that delivers real value.
          </p>

          <p className="text-gray-400 leading-relaxed">
            My experience includes developing full-stack applications, designing
            REST APIs, working with databases, and exploring data analytic. 
            I am always eager to learn and continuously
            improve through real-world projects.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
