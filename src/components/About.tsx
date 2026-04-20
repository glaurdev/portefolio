"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section id="about" className="py-32 px-8 relative z-10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(8,8,21,0.4)] to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto relative grid lg:grid-cols-2 gap-20 items-center">
        {/* Visual */}
        <motion.div {...fadeUp(0)} className="relative w-full aspect-square max-w-[480px] mx-auto">
          {/* Orbit rings */}
          {[
            { inset: "0%", color: "rgba(201,168,76,0.12)", dur: "22s", dot: "#C9A84C" },
            { inset: "14%", color: "rgba(123,92,240,0.12)", dur: "16s", dot: "#A78BFA", rev: true },
            { inset: "28%", color: "rgba(201,168,76,0.08)", dur: "30s", dot: null },
          ].map((ring, i) => (
            <div
              key={i}
              className="absolute rounded-full border"
              style={{
                inset: ring.inset,
                borderColor: ring.color,
                animation: `orbitSpin ${ring.dur} linear infinite ${ring.rev ? "reverse" : ""}`,
              }}
            >
              {ring.dot && (
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                  style={{ background: ring.dot, boxShadow: `0 0 12px ${ring.dot}` }}
                />
              )}
            </div>
          ))}

          {/* Center card */}
          <div
            className="absolute inset-[38%] rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.07)]"
            style={{ background: "linear-gradient(135deg,rgba(201,168,76,0.08),rgba(123,92,240,0.08))" }}
          >
            <span
              className="font-syne text-2xl font-extrabold"
              style={{
                background: "linear-gradient(135deg,#C9A84C,#E8C97A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              GL
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col gap-7">
          <motion.div {...fadeUp(0.1)}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[var(--gold)]" />
              <span className="font-syne text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--gold)]">
                À propos
              </span>
            </div>
            <h2
              className="font-syne font-extrabold leading-[1.05] text-white mb-6"
              style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)" }}
            >
              Code & design,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#C9A84C,#E8C97A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                une seule vision
              </span>
            </h2>
          </motion.div>

          <motion.p {...fadeUp(0.18)} className="text-[var(--text-2)] leading-[1.85] text-base font-light">
            Développeur créatif avec 5 ans d'expérience à la frontière entre ingénierie et art numérique.
            Je transforme des concepts complexes en expériences web immersives alliant précision technique
            et sensibilité esthétique.
          </motion.p>

          <motion.p {...fadeUp(0.24)} className="text-[var(--text-3)] leading-[1.85] text-sm font-light">
            Spécialisé en interfaces 3D, shaders GLSL, animations avancées et architectures frontend
            performantes — chaque projet repousse les limites du web moderne.
          </motion.p>

          {/* Facts */}
          <motion.div {...fadeUp(0.3)} className="grid grid-cols-2 gap-3 mt-2">
            {[
              { label: "Localisation", value: "Paris, France" },
              { label: "Disponibilité", value: "Freelance · CDI" },
              { label: "Spécialité", value: "Frontend & 3D Web" },
              { label: "Langues", value: "FR / EN / ES" },
            ].map((f) => (
              <div
                key={f.label}
                className="p-4 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]"
              >
                <div className="font-syne text-[9px] tracking-[0.18em] uppercase text-[var(--text-3)] mb-1.5">
                  {f.label}
                </div>
                <div className="font-syne text-sm font-medium text-white">{f.value}</div>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.36)}>
            <a
              href="#contact"
              data-hover
              className="inline-flex items-center gap-2 font-syne text-xs font-bold tracking-[0.15em] uppercase text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors group"
            >
              Travaillons ensemble
              <svg className="transition-transform group-hover:translate-x-1" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
