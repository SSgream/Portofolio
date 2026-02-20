"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 bg-gradient-to-br from-[#14002b] via-[#0d0d14] to-black text-white overflow-hidden"
    >
      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl"
      >
        <p className="text-gray-400 mb-3 tracking-wide">I am Selwin</p>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
          Web Developer + <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Data Enthusiast
          </span>
        </h1>

        <p className="text-gray-400 mt-6 leading-relaxed text-lg">
          Developing web applications, APIs, and intelligent systems powered by
          data.
        </p>

        <div className="mt-10 flex gap-4">
          {/* Hire Me */}
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-purple-600 px-7 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
          >
            Hire Me
          </button>

          {/* View Projects */}
          <button
            onClick={() => scrollToSection("projects")}
            className="border border-purple-500 px-7 py-3 rounded-full font-medium transition-all duration-300 hover:bg-purple-500 hover:text-white hover:scale-105"
          >
            View Projects
          </button>
        </div>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative mt-16 md:mt-0"
      >
        <div className="absolute inset-0 bg-purple-600 blur-3xl opacity-30 rounded-full"></div>

        <img
          src="/foto_diri-.png"
          alt="Profile"
          className="relative w-64 md:w-80 rounded-2xl shadow-2xl mr-20"
        />
      </motion.div>
    </section>
  );
}
