"use client";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Profil",         href: "#about"    },
  { label: "Infrastructure", href: "#infra"    },
  { label: "Projets",        href: "#projects" },
  { label: "Compétences",    href: "#skills"   },
  { label: "Contact",        href: "#contact"  },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={
        scrolled
          ? {
              background: "rgba(28,24,20,0.88)",
              backdropFilter: "saturate(160%) blur(20px)",
              WebkitBackdropFilter: "saturate(160%) blur(20px)",
              borderBottom: "1px solid rgba(192,152,80,0.18)",
            }
          : { background: "transparent" }
      }
    >
      <div className="max-w-7xl mx-auto px-8 h-[52px] flex items-center justify-between">
        {/* Logotype */}
        <a
          href="#"
          className="font-serif text-[17px] font-normal tracking-tight text-parchment/90 hover:text-parchment transition-colors duration-300"
        >
          G.&thinsp;Laurent
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative f-label text-stone/70 hover:text-parchment transition-colors duration-300 group pb-0.5"
              >
                {l.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-[width] duration-300 ease-out" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contact" className="link-gold hidden md:inline-flex">
          Me contacter
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
