"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Hero() {
  return (
    <section className="relative h-screen bg-[#000] flex flex-col items-center justify-center overflow-hidden">
      {/* Network 3D */}
      <div className="absolute inset-0 opacity-65 pointer-events-none">
        <Scene3D />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-5xl w-full">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="a-caption text-[var(--blue-l)] mb-5"
        >
          Étudiant Informatique · Spécialité Réseaux · 3ème année
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="a-display text-white mb-6"
        >
          Grégoire Laurent.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.22, ease }}
          className="a-title-3 text-[var(--t2)] max-w-2xl mx-auto mb-10"
        >
          Administrateur d'infrastructure. Architecte réseau.<br />
          Concepteur de la plateforme PMM.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          <a href="#infra" data-hover className="a-btn">
            Découvrir l'infrastructure
          </a>
          <a href="#contact" data-hover className="a-btn-ghost">
            Me contacter
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Scroll chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10"
      >
        <svg
          width="20" height="12" viewBox="0 0 20 12" fill="none"
          className="text-[var(--t4)] animate-bounce"
        >
          <path d="M1 1l9 9 9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
