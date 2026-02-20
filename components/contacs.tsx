"use client";

import { motion } from "framer-motion";

export default function Contact() {
  const whatsapp = "6285796727478";
  const email = "selwins94@gmail.com";

  return (
    <section
      id="contact"
      className="py-32 px-8 md:px-20 bg-black text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Let’s <span className="text-purple-500">Work Together</span>
        </h2>

        <p className="text-gray-400 mb-12">
          I’m currently available for freelance projects, collaborations,
          and full-time opportunities.
        </p>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">

          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            className="bg-[#111122] border border-gray-800 p-6 rounded-xl hover:border-purple-500 transition"
          >
            <p className="text-purple-400 text-sm mb-2">WhatsApp</p>
            <p className="font-medium">+62 857-9672-7478</p>
          </a>

          <a
            href={`mailto:${email}`}
            className="bg-[#111122] border border-gray-800 p-6 rounded-xl hover:border-purple-500 transition"
          >
            <p className="text-purple-400 text-sm mb-2">Email</p>
            <p className="font-medium">{email}</p>
          </a>

          <div className="bg-[#111122] border border-gray-800 p-6 rounded-xl">
            <p className="text-purple-400 text-sm mb-2">Location</p>
            <p className="font-medium">Indonesia</p>
          </div>

        </div>

        {/* Final CTA */}
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          className="inline-block bg-purple-600 px-10 py-4 rounded-full font-medium transition hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
        >
          Start a Conversation
        </a>

      </motion.div>
    </section>
  );
}
