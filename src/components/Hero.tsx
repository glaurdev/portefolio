"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

const roles = ["Creative Developer", "3D Experience Designer", "Frontend Architect", "GLSL / WebGL Engineer"];

export default function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const role = roles[roleIndex];
    let i = 0;
    setDisplayed("");
    setIsTyping(true);
    const iv = setInterval(() => {
      if (i < role.length) {
        setDisplayed(role.slice(0, ++i));
      } else {
        clearInterval(iv);
        setIsTyping(false);
        setTimeout(() => setRoleIndex((p) => (p + 1) % roles.length), 2400);
      }
    }, 62);
    return () => clearInterval(iv);
  }, [roleIndex]);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const up = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* 3D canvas */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_65%_50%,transparent_25%,rgba(4,4,12,0.65)_65%,rgba(4,4,12,0.96)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[2] bg-gradient-to-t from-[#04040C] to-transparent" />

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-28 pb-24"
      >
        {/* Eyebrow */}
        <motion.div variants={up} className="flex items-center gap-3 mb-10">
          <div className="w-8 h-px bg-[var(--gold)]" />
          <span className="font-syne text-[10px] font-semibold tracking-[0.28em] uppercase text-[var(--gold)]">
            Portfolio · 2025
          </span>
        </motion.div>

        {/* Name — architectural layout */}
        <motion.div variants={up} className="mb-6 overflow-hidden">
          <h1 className="font-syne leading-[0.88] tracking-tight">
            <span
              className="block text-[clamp(4.5rem,11vw,10.5rem)] font-extrabold text-white"
            >
              Grégoire
            </span>
            <span
              className="block text-[clamp(4.5rem,11vw,10.5rem)] font-extrabold"
              style={{
                WebkitTextStroke: "1.5px #C9A84C",
                color: "transparent",
              }}
            >
              LAURENT
            </span>
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div variants={up} className="mb-10 h-9 flex items-center gap-2">
          <div className="w-4 h-px bg-[var(--gold)] opacity-60" />
          <span className="font-syne text-[clamp(0.9rem,2vw,1.15rem)] font-medium text-[var(--text-2)] tracking-wide">
            {displayed}
            <span
              className="cursor-blink"
              style={{ opacity: isTyping ? 1 : undefined }}
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={up}
          className="text-[clamp(0.9rem,1.4vw,1rem)] text-[var(--text-2)] leading-[1.8] max-w-lg mb-12 font-light"
        >
          Je conçois des expériences web immersives à la frontière entre ingénierie et art —
          là où les shaders GLSL rencontrent le product design.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={up} className="flex flex-wrap items-center gap-5">
          <a
            href="#projects"
            data-hover
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#04040C] font-syne text-xs font-bold tracking-[0.12em] uppercase rounded-full transition-all duration-300"
            style={{ boxShadow: "0 0 30px rgba(201,168,76,0.25)" }}
          >
            Voir le travail
            <svg className="transition-transform group-hover:translate-x-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#contact"
            data-hover
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[rgba(255,255,255,0.08)] font-syne text-xs font-semibold tracking-[0.12em] uppercase text-[var(--text-2)] hover:border-[rgba(201,168,76,0.3)] hover:text-white transition-all duration-300"
          >
            Discutons
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div variants={up} className="mt-20 flex flex-wrap gap-12">
          {[
            { value: "5+", label: "Années" },
            { value: "60+", label: "Projets" },
            { value: "30+", label: "Clients" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="font-syne text-4xl font-extrabold mb-1"
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #E8C97A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <div className="font-syne text-[10px] tracking-[0.2em] uppercase text-[var(--text-3)]">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-syne text-[9px] tracking-[0.3em] uppercase text-[var(--text-3)]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--gold)] to-transparent scroll-pulse" />
      </motion.div>
    </section>
  );
}
