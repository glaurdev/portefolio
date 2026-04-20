"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section id="about" className="section py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — visual */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Abstract 3D-inspired visual */}
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-gold/15 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-gold/10 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-14 rounded-full border border-[rgba(123,97,255,0.15)] animate-[spin_25s_linear_infinite]" />

              {/* Center card */}
              <div className="absolute inset-20 glass-card flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-[rgba(123,97,255,0.05)]" />
                <div className="relative text-center px-6">
                  <div className="font-display text-7xl font-bold text-gradient-gold mb-2">GL</div>
                  <div className="font-grotesk text-xs tracking-[0.2em] text-night-300 uppercase">Creative Dev</div>
                </div>
              </div>

              {/* Orbiting dots */}
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    top: `calc(50% - 1.5px + ${Math.sin((deg * Math.PI) / 180) * 45}%)`,
                    left: `calc(50% - 1.5px + ${Math.cos((deg * Math.PI) / 180) * 45}%)`,
                    background: i % 2 === 0 ? "#C9A84C" : "#7B61FF",
                    boxShadow: `0 0 10px ${i % 2 === 0 ? "rgba(201,168,76,0.7)" : "rgba(123,97,255,0.7)"}`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right — content */}
          <div className="flex flex-col gap-8">
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gold" />
                <span className="font-grotesk text-sm font-medium text-gold tracking-[0.2em] uppercase">À propos</span>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-tight text-white mb-6">
                Crafting digital{" "}
                <em className="text-gradient-gold not-italic">excellence</em>{" "}
                with code & vision
              </h2>
            </motion.div>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-body text-night-200 leading-[1.8] text-base"
            >
              Développeur créatif passionné par la frontière entre ingénierie et art,
              je transforme des idées complexes en expériences web immersives.
              Spécialisé en interfaces 3D, animations avancées et architecture frontend performante.
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-body text-night-300 leading-[1.8] text-base"
            >
              Chaque projet est une opportunité de repousser les limites du possible sur le web —
              en alliant précision technique et sensibilité esthétique pour créer quelque chose
              qui marque durablement les esprits.
            </motion.p>

            {/* Facts grid */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-4 mt-2"
            >
              {[
                { label: "Localisation", value: "Paris, France" },
                { label: "Disponibilité", value: "Freelance / CDI" },
                { label: "Spécialité", value: "Frontend & 3D" },
                { label: "Langues", value: "FR / EN / ES" },
              ].map((fact) => (
                <div key={fact.label} className="glass-card p-4 border border-white/5 rounded-xl">
                  <div className="font-grotesk text-[10px] tracking-[0.15em] uppercase text-night-300 mb-1.5">
                    {fact.label}
                  </div>
                  <div className="font-grotesk text-sm font-medium text-white">{fact.value}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <a
                href="#contact"
                data-hover
                className="inline-flex items-center gap-2 font-grotesk text-sm font-medium text-gold hover:text-gold-light transition-colors group"
              >
                Travaillons ensemble
                <svg className="transition-transform group-hover:translate-x-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
