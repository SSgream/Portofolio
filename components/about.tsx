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
            src="/profile.jpg"
            alt="About Me"
            className="relative rounded-2xl shadow-2xl"
          />
        </div>

        {/* TEXT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About <span className="text-purple-500">Me</span>
          </h2>

          <p className="text-gray-400 leading-relaxed mb-6">
            I am a passionate web developer focused on building modern,
            scalable, and high-performance applications. I love creating
            intuitive user experiences and solving real-world problems
            through technology.
          </p>

          <p className="text-gray-400 leading-relaxed">
            With experience in frontend, backend, and UI/UX design, I aim
            to deliver digital products that are not only functional but
            also visually engaging.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
