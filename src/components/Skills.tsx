"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const groups = [
  {
    icon: "◈",
    color: "#C9A84C",
    name: "Frontend",
    items: [
      { name: "React / Next.js", level: 96 },
      { name: "TypeScript", level: 92 },
      { name: "Three.js / WebGL", level: 85 },
      { name: "GSAP / Framer Motion", level: 90 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    icon: "◉",
    color: "#A78BFA",
    name: "Backend",
    items: [
      { name: "Node.js / Express", level: 88 },
      { name: "Python / FastAPI", level: 80 },
      { name: "PostgreSQL", level: 82 },
      { name: "GraphQL", level: 78 },
      { name: "Docker / DevOps", level: 75 },
    ],
  },
  {
    icon: "◆",
    color: "#E8C97A",
    name: "Design & 3D",
    items: [
      { name: "Figma / Design Systems", level: 88 },
      { name: "GLSL Shaders", level: 72 },
      { name: "Blender 3D", level: 70 },
      { name: "Motion Design", level: 84 },
      { name: "UI/UX Architecture", level: 87 },
    ],
  },
];

function Bar({ name, level, color, i, inView }: { name: string; level: number; color: string; i: number; inView: boolean }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-syne text-xs text-[var(--text-2)] tracking-wide">{name}</span>
        <span className="font-syne text-[10px] font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className="h-px bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.3, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}55, ${color})` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="w-8 h-px bg-[var(--gold)]" />
            <span className="font-syne text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--gold)]">
              Expertise
            </span>
            <div className="w-8 h-px bg-[var(--gold)]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="font-syne font-extrabold text-white"
            style={{ fontSize: "clamp(2.4rem,5vw,4rem)" }}
          >
            Stack &{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#C9A84C,#E8C97A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Compétences
            </span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {groups.map((g, gi) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15 + gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-8 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.09)] transition-all duration-500 group overflow-hidden"
            >
              {/* Corner glow */}
              <div
                className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${g.color}15, transparent 70%)` }}
              />

              <div className="flex items-center gap-3 mb-8">
                <span
                  className="text-xl"
                  style={{ color: g.color, filter: `drop-shadow(0 0 8px ${g.color}60)` }}
                >
                  {g.icon}
                </span>
                <span className="font-syne font-bold text-white text-base">{g.name}</span>
              </div>

              <div className="flex flex-col gap-5">
                {g.items.map((item, ii) => (
                  <Bar key={item.name} name={item.name} level={item.level} color={g.color} i={ii} inView={inView} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-14 flex flex-wrap justify-center gap-2.5"
        >
          {["React", "Next.js", "TypeScript", "Three.js", "WebGL", "GLSL", "GSAP", "Node.js", "Python", "PostgreSQL", "Docker", "Figma", "Blender", "Tailwind"].map(
            (t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-full border border-[rgba(255,255,255,0.05)] font-syne text-[10px] tracking-[0.1em] uppercase text-[var(--text-3)] hover:border-[rgba(201,168,76,0.25)] hover:text-[var(--text-2)] transition-all duration-300"
              >
                {t}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
