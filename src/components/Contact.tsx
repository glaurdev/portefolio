"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1800);
  };

  return (
    <section id="contact" className="section py-32 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-[rgba(201,168,76,0.06)] to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-[300px] h-[300px] bg-gradient-radial from-[rgba(123,97,255,0.05)] to-transparent rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-gold" />
              <span className="font-grotesk text-sm font-medium text-gold tracking-[0.2em] uppercase">Contact</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold text-white leading-[1.1] mb-6"
            >
              Démarrons un{" "}
              <span className="text-gradient-gold">projet</span>{" "}
              ensemble
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-body text-night-200 leading-relaxed mb-10 max-w-md"
            >
              Disponible pour des missions freelance, des projets full-time ou des
              collaborations créatives. Parlez-moi de votre idée.
            </motion.p>

            {/* Email */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              href="mailto:gregoire@laurent.dev"
              data-hover
              className="group inline-flex items-center gap-3 mb-12"
            >
              <span className="font-grotesk text-lg font-medium text-gold group-hover:text-gold-light transition-colors">
                gregoire@laurent.dev
              </span>
              <svg
                className="text-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                width="16" height="16" viewBox="0 0 14 14" fill="none"
              >
                <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  aria-label={s.label}
                  className="w-12 h-12 glass-card border border-white/5 rounded-xl flex items-center justify-center text-night-300 hover:text-white hover:border-gold/30 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-grotesk text-xs text-night-300 tracking-wide uppercase">Prénom</label>
                  <input
                    type="text"
                    required
                    placeholder="Jean"
                    className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3.5 font-grotesk text-sm text-white placeholder:text-night-400 focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-grotesk text-xs text-night-300 tracking-wide uppercase">Nom</label>
                  <input
                    type="text"
                    required
                    placeholder="Dupont"
                    className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3.5 font-grotesk text-sm text-white placeholder:text-night-400 focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-grotesk text-xs text-night-300 tracking-wide uppercase">Email</label>
                <input
                  type="email"
                  required
                  placeholder="jean@exemple.com"
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3.5 font-grotesk text-sm text-white placeholder:text-night-400 focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-grotesk text-xs text-night-300 tracking-wide uppercase">Sujet</label>
                <input
                  type="text"
                  placeholder="Projet freelance, collaboration..."
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3.5 font-grotesk text-sm text-white placeholder:text-night-400 focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-grotesk text-xs text-night-300 tracking-wide uppercase">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Décrivez votre projet..."
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3.5 font-grotesk text-sm text-white placeholder:text-night-400 focus:outline-none focus:border-gold/40 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                data-hover
                disabled={sending || sent}
                className={`w-full py-4 rounded-xl font-grotesk text-sm font-semibold transition-all duration-300 ${
                  sent
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gold hover:bg-gold-light text-[#050508] glow-gold hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                }`}
              >
                {sent ? "Message envoyé ✓" : sending ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <span className="font-grotesk text-sm text-night-300">
            © 2025 Grégoire LAURENT — All rights reserved
          </span>
          <span className="font-grotesk text-xs text-night-400 flex items-center gap-2">
            Crafted with
            <span className="text-gold">♥</span>
            & Three.js
          </span>
        </motion.div>
      </div>
    </section>
  );
}
