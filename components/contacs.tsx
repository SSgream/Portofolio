"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contacs" className="py-24 px-8 md:px-20 bg-black text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Let’s <span className="text-purple-500">Work Together</span>
        </h2>

        <p className="text-gray-400 mb-8">
          Have a project in mind? Let’s build something amazing.
        </p>

        <a
          href="mailto:youremail@gmail.com"
          className="bg-purple-600 px-8 py-3 rounded-full font-medium transition hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
        >
          Contact Me
        </a>
      </motion.div>
    </section>
  );
}
