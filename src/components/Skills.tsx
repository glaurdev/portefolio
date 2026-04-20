"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    category: "Frontend",
    icon: "◈",
    color: "#C9A84C",
    skills: [
      { name: "React / Next.js", level: 96 },
      { name: "TypeScript", level: 92 },
      { name: "Three.js / WebGL", level: 85 },
      { name: "Framer Motion", level: 90 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    category: "Backend",
    icon: "◉",
    color: "#7B61FF",
    skills: [
      { name: "Node.js / Express", level: 88 },
      { name: "Python / FastAPI", level: 80 },
      { name: "PostgreSQL", level: 82 },
      { name: "GraphQL", level: 78 },
      { name: "Docker / CI/CD", level: 75 },
    ],
  },
  {
    category: "Design & 3D",
    icon: "◆",
    color: "#E8C97A",
    skills: [
      { name: "Figma / Sketch", level: 88 },
      { name: "Blender 3D", level: 72 },
      { name: "GSAP / Animations", level: 90 },
      { name: "Motion Design", level: 84 },
      { name: "UI/UX Systems", level: 86 },
    ],
  },
];

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="font-grotesk text-sm text-night-200 group-hover:text-white transition-colors">{name}</span>
        <span className="font-grotesk text-xs font-medium" style={{ color }}>{level}%</span>
      </div>
      <div className="h-px bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section py-32 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(12,12,20,0.5)] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gold" />
            <span className="font-grotesk text-sm font-medium text-gold tracking-[0.2em] uppercase">Expertise</span>
            <div className="w-8 h-px bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold text-white"
          >
            Stack & <span className="text-gradient-gold">Compétences</span>
          </motion.h2>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-500 group"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="text-2xl"
                  style={{ color: group.color, filter: `drop-shadow(0 0 8px ${group.color}60)` }}
                >
                  {group.icon}
                </span>
                <h3 className="font-grotesk font-semibold text-white text-lg">{group.category}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-5">
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={group.color}
                    index={si}
                  />
                ))}
              </div>

              {/* Decorative corner */}
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${group.color}15, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {[
            "React", "Next.js", "TypeScript", "Three.js", "GSAP", "Framer Motion",
            "Node.js", "Python", "PostgreSQL", "Docker", "Figma", "WebGL", "Tailwind", "GraphQL",
          ].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 glass-card border border-white/5 font-grotesk text-xs text-night-200 rounded-full hover:border-gold/30 hover:text-white transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
