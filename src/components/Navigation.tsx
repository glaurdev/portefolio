"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "Profil",       href: "#about" },
  { label: "Infrastructure", href: "#infra" },
  { label: "Projets",      href: "#projects" },
  { label: "Compétences",  href: "#skills" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={`a-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="w-full max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" data-hover className="text-white text-sm font-semibold tracking-tight">
          Grégoire Laurent
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                data-hover
                className="text-[var(--t2)] hover:text-white text-xs font-medium transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contact" data-hover className="a-btn-ghost text-sm">
          Contact
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
