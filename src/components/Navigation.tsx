"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[rgba(4,4,12,0.88)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.05)]"
          : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          data-hover
          className="font-syne font-extrabold text-lg tracking-wide text-gold-gradient"
          style={{
            background: "linear-gradient(135deg, #C9A84C, #E8C97A)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          GL
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                data-hover
                className="relative font-syne text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-2)] hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          data-hover
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(201,168,76,0.25)] font-syne text-xs font-semibold tracking-[0.1em] uppercase text-[var(--gold)] hover:bg-[rgba(201,168,76,0.08)] hover:border-[var(--gold)] transition-all duration-300"
        >
          Contact
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          data-hover
        >
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "w-6 rotate-45 translate-y-2.5" : "w-6"}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-4"}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "w-6 -rotate-45 -translate-y-2.5" : "w-6"}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[rgba(4,4,12,0.97)] backdrop-blur-2xl border-t border-[rgba(255,255,255,0.05)]"
          >
            <ul className="flex flex-col px-8 py-6 gap-5">
              {[...links, { label: "Contact", href: "#contact" }].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-syne text-base font-semibold tracking-[0.12em] uppercase text-[var(--text-2)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
