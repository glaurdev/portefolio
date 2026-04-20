"use client";
import { motion, useInView } from "framer-motion";
import { useRef, MouseEvent } from "react";

const projects = [
  {
    num: "01",
    title: "Nexus Platform",
    category: "Full Stack SaaS",
    year: "2024",
    desc: "Plateforme analytique en temps réel avec architecture microservices, dashboard IA adaptatif et pipeline de données haute performance.",
    stack: ["Next.js", "TypeScript", "GraphQL", "PostgreSQL"],
    accent: "#C9A84C",
    accentBg: "rgba(201,168,76,0.07)",
  },
  {
    num: "02",
    title: "Spatial Experience",
    category: "WebGL · 3D",
    year: "2024",
    desc: "Expérience immersive 3D en temps réel avec shaders GLSL personnalisés, navigation spatiale et particules dynamiques pour une marque premium.",
    stack: ["Three.js", "WebGL", "GLSL", "GSAP"],
    accent: "#A78BFA",
    accentBg: "rgba(123,92,240,0.07)",
  },
  {
    num: "03",
    title: "Aurora Design System",
    category: "UI/UX System",
    year: "2023",
    desc: "Système de design complet — 200+ composants, design tokens, documentation interactive et thèmes adaptatifs. WCAG AAA.",
    stack: ["React", "Storybook", "Figma", "Tailwind"],
    accent: "#C9A84C",
    accentBg: "rgba(201,168,76,0.07)",
  },
  {
    num: "04",
    title: "Luminary Commerce",
    category: "E-commerce Luxury",
    year: "2023",
    desc: "Boutique luxury avec 3D product viewer, animations immersives et tunnel d'achat optimisé pour une maison de joaillerie parisienne.",
    stack: ["Next.js", "Three.js", "Stripe", "Sanity"],
    accent: "#A78BFA",
    accentBg: "rgba(123,92,240,0.07)",
  },
];

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) scale3d(1.02,1.02,1.02)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0) scale3d(1,1,1)";
  };

  return (
    <div
      ref={ref}
      className={`tilt-card transition-transform duration-200 ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-32 px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-8 h-px bg-[var(--gold)]" />
              <span className="font-syne text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--gold)]">
                Sélection
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="font-syne font-extrabold leading-tight text-white"
              style={{ fontSize: "clamp(2.4rem,5vw,4rem)" }}
            >
              Travaux{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#C9A84C,#E8C97A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                récents
              </span>
            </motion.h2>
          </div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            href="#contact"
            data-hover
            className="hidden md:inline-flex items-center gap-2 font-syne text-xs font-semibold tracking-[0.12em] uppercase text-[var(--text-3)] hover:text-white transition-colors group"
          >
            Tous les projets
            <svg className="transition-transform group-hover:translate-x-1" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard>
                <div
                  className="relative overflow-hidden rounded-2xl p-8 min-h-[300px] flex flex-col justify-between group border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] transition-all duration-500"
                  style={{ background: p.accentBg }}
                  data-hover
                >
                  {/* Radial hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(circle at 70% 30%, ${p.accentBg}, transparent 65%)` }}
                  />

                  {/* Top */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <span
                        className="font-syne text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border"
                        style={{ color: p.accent, borderColor: `${p.accent}30`, background: `${p.accent}10` }}
                      >
                        {p.category}
                      </span>
                      <div className="text-right">
                        <span className="font-syne text-[10px] tracking-[0.15em] text-[var(--text-3)]">{p.num}</span>
                        <span className="block font-syne text-[10px] text-[var(--text-3)]">{p.year}</span>
                      </div>
                    </div>
                    <h3 className="font-syne text-2xl font-bold text-white mb-3">{p.title}</h3>
                    <p className="text-sm text-[var(--text-2)] leading-[1.75] max-w-sm">{p.desc}</p>
                  </div>

                  {/* Bottom */}
                  <div className="relative z-10 flex items-end justify-between mt-8">
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-1 rounded border border-[rgba(255,255,255,0.06)] text-[var(--text-3)] font-syne tracking-wide"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#"
                      data-hover
                      className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0 ml-3"
                      style={{ borderColor: `${p.accent}35`, color: p.accent }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
