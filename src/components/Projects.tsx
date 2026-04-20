"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";

const projects = [
  {
    id: 1,
    title: "Nexus Platform",
    category: "Full Stack SaaS",
    description:
      "Plateforme SaaS haute performance avec tableau de bord analytique en temps réel, architecture microservices et interface adaptative basée sur l'IA.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "GraphQL"],
    color: "#C9A84C",
    accent: "rgba(201,168,76,0.08)",
    size: "large",
    year: "2024",
  },
  {
    id: 2,
    title: "Spatial Experience",
    category: "WebGL / 3D",
    description:
      "Expérience immersive 3D en temps réel avec navigation spatiale, particules dynamiques et shaders personnalisés pour une marque de luxe.",
    stack: ["Three.js", "WebGL", "GSAP", "React"],
    color: "#7B61FF",
    accent: "rgba(123,97,255,0.08)",
    size: "small",
    year: "2024",
  },
  {
    id: 3,
    title: "Aurora Design System",
    category: "UI/UX Design System",
    description:
      "Système de design complet avec 200+ composants, tokens de design, documentation interactive et thèmes dynamiques.",
    stack: ["React", "Storybook", "Figma", "Tailwind"],
    color: "#E8C97A",
    accent: "rgba(232,201,122,0.08)",
    size: "small",
    year: "2023",
  },
  {
    id: 4,
    title: "Luminary Commerce",
    category: "E-commerce Premium",
    description:
      "Boutique e-commerce premium avec animations fluides, 3D product viewer et tunnel de conversion optimisé pour une marque de joaillerie.",
    stack: ["Next.js", "Three.js", "Stripe", "Sanity"],
    color: "#C9A84C",
    accent: "rgba(201,168,76,0.06)",
    size: "large",
    year: "2023",
  },
];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02,1.02,1.02)`;
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card transition-transform duration-200 ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="section py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-gold" />
              <span className="font-grotesk text-sm font-medium text-gold tracking-[0.2em] uppercase">Projets</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold text-white leading-tight"
            >
              Sélection de{" "}
              <span className="text-gradient-gold">travaux</span>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            href="#contact"
            data-hover
            className="hidden md:inline-flex items-center gap-2 font-grotesk text-sm text-night-200 hover:text-white transition-colors group"
          >
            Voir tous les projets
            <svg className="transition-transform group-hover:translate-x-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard>
                <div
                  className="relative overflow-hidden rounded-2xl border border-white/5 p-8 min-h-[280px] flex flex-col justify-between group"
                  style={{ background: `linear-gradient(135deg, ${project.accent} 0%, rgba(5,5,8,0.8) 100%)` }}
                  onMouseEnter={() => setHovered(project.id)}
                  onMouseLeave={() => setHovered(null)}
                  data-hover
                >
                  {/* Background glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 70% 30%, ${project.accent} 0%, transparent 60%)`,
                    }}
                  />

                  {/* Top row */}
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <span
                        className="inline-block px-3 py-1 text-[10px] font-grotesk font-medium tracking-[0.15em] uppercase rounded-full mb-4 border"
                        style={{ color: project.color, borderColor: `${project.color}30`, background: `${project.color}10` }}
                      >
                        {project.category}
                      </span>
                      <h3 className="font-display text-2xl font-semibold text-white mb-3">
                        {project.title}
                      </h3>
                      <p className="font-body text-sm text-night-200 leading-relaxed max-w-xs">
                        {project.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className="font-grotesk text-xs text-night-300">{project.year}</span>
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="flex items-end justify-between relative z-10 mt-6">
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded text-[10px] font-grotesk text-night-300 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div
                      className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ borderColor: `${project.color}40`, color: project.color }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Hover corner decoration */}
                  <div
                    className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, transparent, ${project.color}08)` }}
                  />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
