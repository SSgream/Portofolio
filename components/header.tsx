"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "hero" },
    { name: "Services", link: "services" },
    { name: "Projects", link: "projects" },
    { name: "About", link: "about" },
    { name: "Experience", link: "experience" },
    { name: "Contact", link: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) =>
        document.getElementById(item.link)
      );

      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActive(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

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

        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide cursor-pointer"
            onClick={() => scrollToSection("hero")}>
          Selwin<span className="text-purple-500">.</span>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.link}
              onClick={() => scrollToSection(item.link)}
              className={`transition relative ${
                active === item.link
                  ? "text-purple-400"
                  : "hover:text-purple-400"
              }`}
            >
              {item.name}

              {active === item.link && (
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-purple-500"></span>
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg text-white px-8 py-6 space-y-6">
          {navItems.map((item) => (
            <button
              key={item.link}
              onClick={() => scrollToSection(item.link)}
              className="block w-full text-left hover:text-purple-400 transition"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </motion.header>
  );
}
