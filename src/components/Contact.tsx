"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1800);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 35 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section id="contact" className="py-32 px-8 relative z-10 overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse,rgba(201,168,76,0.05),transparent 70%)" }} />
      <div className="absolute top-16 right-16 w-[280px] h-[280px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse,rgba(123,92,240,0.04),transparent 70%)" }} />

      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[var(--gold)]" />
              <span className="font-syne text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--gold)]">Contact</span>
            </motion.div>

            <motion.h2
              {...fadeUp(0.08)}
              className="font-syne font-extrabold leading-[1.05] text-white mb-6"
              style={{ fontSize: "clamp(2.4rem,5.5vw,4.5rem)" }}
            >
              Démarrons un{" "}
              <span style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                projet
              </span>
            </motion.h2>

            <motion.p {...fadeUp(0.15)} className="text-[var(--text-2)] leading-[1.8] text-sm font-light mb-10 max-w-sm">
              Disponible pour missions freelance, postes full-time et collaborations créatives.
              Parlons de votre idée.
            </motion.p>

            <motion.a
              {...fadeUp(0.2)}
              href="mailto:gregoire@laurent.dev"
              data-hover
              className="group inline-flex items-center gap-2 font-syne font-semibold text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors mb-10"
              style={{ fontSize: "clamp(1rem,2vw,1.2rem)" }}
            >
              gregoire@laurent.dev
              <svg className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>

            <motion.div {...fadeUp(0.26)} className="flex gap-3">
              {[
                { label: "GitHub", path: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" },
                { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { label: "Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  aria-label={s.label}
                  className="w-11 h-11 rounded-xl border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[var(--text-3)] hover:text-white hover:border-[rgba(201,168,76,0.25)] transition-all duration-300"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-8 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Prénom", placeholder: "Jean" },
                { label: "Nom", placeholder: "Dupont" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col gap-2">
                  <label className="font-syne text-[9px] tracking-[0.2em] uppercase text-[var(--text-3)]">{f.label}</label>
                  <input
                    type="text"
                    required
                    placeholder={f.placeholder}
                    className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-xl px-4 py-3.5 font-syne text-sm text-white placeholder:text-[var(--text-3)] focus:outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-syne text-[9px] tracking-[0.2em] uppercase text-[var(--text-3)]">Email</label>
              <input
                type="email"
                required
                placeholder="jean@exemple.com"
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-xl px-4 py-3.5 font-syne text-sm text-white placeholder:text-[var(--text-3)] focus:outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-syne text-[9px] tracking-[0.2em] uppercase text-[var(--text-3)]">Message</label>
              <textarea
                required
                rows={4}
                placeholder="Parlez-moi de votre projet..."
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-xl px-4 py-3.5 font-syne text-sm text-white placeholder:text-[var(--text-3)] focus:outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              data-hover
              disabled={sending || sent}
              className="w-full py-4 rounded-full font-syne text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300"
              style={
                sent
                  ? { background: "rgba(74,222,128,0.12)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.25)" }
                  : { background: "var(--gold)", color: "#04040C", boxShadow: "0 0 30px rgba(201,168,76,0.2)" }
              }
            >
              {sent ? "Message envoyé ✓" : sending ? "Envoi en cours..." : "Envoyer le message"}
            </button>
          </motion.form>
        </div>

        {/* Footer row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <span className="font-syne text-xs text-[var(--text-3)] tracking-wide">
            © 2025 Grégoire LAURENT — All rights reserved
          </span>
          <span className="font-syne text-[10px] text-[var(--text-3)] flex items-center gap-2 tracking-wide">
            Crafted with <span className="text-[var(--gold)]">♥</span> Three.js & GLSL
          </span>
        </motion.div>
      </div>
    </section>
  );
}
