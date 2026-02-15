"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", link: "#hero" },
    { name: "Services", link: "#services" },
    { name: "Projects", link: "#projects" },
    { name: "About", link: "#about" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-20 py-4 flex justify-between items-center text-white">
        <h1 className="text-xl font-bold tracking-wide">
          Selwin<span className="text-purple-500">.</span>
        </h1>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="hover:text-purple-400 transition"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
