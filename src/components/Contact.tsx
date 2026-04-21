"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1600);
  };

  return (
    <section id="contact" className="bg-[var(--surface)] py-28 px-8">
      <div ref={ref} className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-20"
        >
          <p className="a-caption mb-5">Contact</p>
          <h2 className="a-title-1 text-white">
            Une question sur{" "}
            <span className="a-text-blue">l'infrastructure ?</span>
          </h2>
          <p className="a-title-3 mt-5 max-w-xl mx-auto">
            Pour une collaboration, un stage, ou simplement échanger autour des réseaux.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-4xl mx-auto">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="text-[11px] uppercase tracking-widest text-[var(--t4)] mb-2">Email</p>
              <a
                href="mailto:gregoire.laurent@etudiant.fr"
                data-hover
                className="a-btn-ghost text-base"
              >
                gregoire.laurent@etudiant.fr
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-widest text-[var(--t4)] mb-3">Réseaux</p>
              <div className="flex gap-3">
                {[
                  { label: "GitHub",   icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" },
                  { label: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                ].map((s) => (
                  <a key={s.label} href="#" target="_blank" rel="noopener noreferrer" data-hover aria-label={s.label}
                    className="w-11 h-11 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-[var(--t3)] hover:text-white hover:bg-[#3a3a3c] transition-all duration-200">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(255,255,255,0.07)]">
              <p className="text-[11px] uppercase tracking-widest text-[var(--t4)] mb-3">Disponibilité</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#30D158] shadow-[0_0_8px_#30D158]" />
                <span className="text-sm text-[var(--t1)]">Disponible pour un stage</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.18, ease }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--t4)] mb-2">Prénom</p>
                <input type="text" placeholder="Jean" required className="a-input" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--t4)] mb-2">Nom</p>
                <input type="text" placeholder="Dupont" required className="a-input" />
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[var(--t4)] mb-2">Email</p>
              <input type="email" placeholder="jean@exemple.com" required className="a-input" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[var(--t4)] mb-2">Message</p>
              <textarea rows={4} placeholder="Votre message…" required
                className="a-input resize-none" />
            </div>
            <button
              type="submit"
              data-hover
              disabled={sending || sent}
              className="a-btn w-full mt-1 disabled:opacity-60 transition-opacity"
              style={sent ? { background: "#1c3a20", color: "#30D158" } : {}}
            >
              {sent ? "Message envoyé ✓" : sending ? "Envoi…" : "Envoyer"}
            </button>
          </motion.form>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-6xl mx-auto mt-24 pt-8 border-t border-[rgba(255,255,255,0.07)] flex flex-col sm:flex-row justify-between items-center gap-3"
      >
        <span className="text-xs text-[var(--t4)]">Copyright © 2025 Grégoire Laurent. Tous droits réservés.</span>
        <span className="text-xs text-[var(--t4)]">Spécialité Réseaux · 3ème année Informatique</span>
      </motion.div>
    </section>
  );
}
