"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

const roles = ["Creative Developer", "3D Experience Designer", "Frontend Architect", "UI/UX Engineer"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const role = roles[roleIndex];
    let i = 0;
    setDisplayed("");
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (i < role.length) {
        setDisplayed(role.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2200);
      }
    }, 60);

    return () => clearInterval(typeInterval);
  }, [roleIndex]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-radial from-transparent via-[rgba(5,5,8,0.5)] to-[rgba(5,5,8,0.92)]" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[2] bg-gradient-to-t from-[#050508] to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-gold" />
            <span className="font-grotesk text-sm font-medium text-gold tracking-[0.2em] uppercase">
              Portfolio 2025
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants} className="mb-4">
            <h1 className="font-display leading-[0.95] tracking-tight">
              <span className="block text-[clamp(3.5rem,9vw,9rem)] font-semibold text-white">
                Grégoire
              </span>
              <span className="block text-[clamp(3.5rem,9vw,9rem)] font-semibold text-gradient-gold text-glow-gold">
                LAURENT
              </span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={itemVariants} className="mb-10 h-10 flex items-center">
            <span className="font-grotesk text-[clamp(1rem,2.5vw,1.5rem)] font-light text-night-200">
              {displayed}
              <span
                className={`inline-block w-0.5 h-[1.1em] ml-0.5 bg-gold align-middle transition-opacity ${
                  isTyping ? "opacity-100" : "animate-pulse"
                }`}
              />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-body text-[clamp(0.95rem,1.5vw,1.1rem)] text-night-200 leading-relaxed max-w-xl mb-12"
          >
            Je conçois des expériences web immersives qui allient esthétique de haute précision
            et performance technique — là où le code rencontre l'art.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5">
            <a
              href="#projects"
              data-hover
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold-light text-[#050508] font-grotesk text-sm font-semibold rounded-full transition-all duration-300 glow-gold hover:shadow-[0_0_40px_rgba(201,168,76,0.4)]"
            >
              Voir mon travail
              <svg className="transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#contact"
              data-hover
              className="inline-flex items-center gap-2 px-8 py-4 glass-card border border-white/10 font-grotesk text-sm font-medium text-white hover:border-gold/30 hover:bg-white/5 rounded-full transition-all duration-300"
            >
              Me contacter
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-20 flex flex-wrap items-center gap-10"
          >
            {[
              { value: "5+", label: "Années d'expérience" },
              { value: "60+", label: "Projets livrés" },
              { value: "30+", label: "Clients satisfaits" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="counter-number text-4xl font-semibold text-gradient-gold">
                  {stat.value}
                </span>
                <span className="font-grotesk text-xs text-night-300 tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase text-night-300">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent animate-float" />
      </motion.div>
    </section>
  );
}
