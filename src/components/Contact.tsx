"use client";
import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".contact-label", {
        opacity: 0, x: -18, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-label", start: "top 88%" },
      });

      gsap.from(".contact-headline", {
        opacity: 0, y: 35, duration: 1.1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-headline", start: "top 82%" },
      });

      gsap.from(".contact-left", {
        opacity: 0, x: -30, duration: 1.0, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-left", start: "top 82%" },
      });

      gsap.from(".contact-right", {
        opacity: 0, x: 30, duration: 1.0, delay: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-right", start: "top 82%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1600);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden py-32 px-8"
      style={{ backgroundColor: "var(--parchment)", color: "var(--ink)" }}
    >
      <div className="grain" style={{ opacity: 0.5 }} aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <p className="contact-label f-label mb-16" style={{ color: "var(--gold)" }}>Contact</p>

        <div className="mb-20">
          <div className="overflow-hidden mb-1">
            <h2 className="contact-headline f-title" style={{ color: "var(--ink)" }}>Une question</h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="contact-headline f-title italic" style={{ color: "var(--gold)" }}>sur l'infrastructure ?</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left — contact info */}
          <div className="contact-left space-y-10">

            <div>
              <p className="f-label mb-3" style={{ color: "var(--muted)" }}>Email direct</p>
              <a
                href="mailto:gregoire.laurent@etudiant.fr"
                className="link-gold text-base"
                style={{ color: "var(--gold)", fontSize: 15 }}
              >
                gregoire.laurent@etudiant.fr
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div>
              <p className="f-label mb-4" style={{ color: "var(--muted)" }}>Réseaux professionnels</p>
              <div className="flex gap-3">
                {[
                  {
                    label: "GitHub",
                    path: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z",
                  },
                  {
                    label: "LinkedIn",
                    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 flex items-center justify-center transition-all duration-300 hover:border-gold"
                    style={{ border: "1px solid rgba(192,152,80,0.25)", color: "var(--stone)" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="pt-6" style={{ borderTop: "1px solid rgba(192,152,80,0.2)" }}>
              <p className="f-label mb-3" style={{ color: "var(--muted)" }}>Disponibilité</p>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inset-0 rounded-full opacity-55" style={{ backgroundColor: "var(--gold)" }} />
                  <span className="relative flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: "var(--gold)" }} />
                </span>
                <span className="f-body-sm" style={{ color: "var(--charcoal)" }}>Disponible pour un stage · 2025</span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <form className="contact-right flex flex-col gap-7" onSubmit={handleSubmit} data-lenis-prevent>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="f-label block mb-3" style={{ color: "var(--muted)" }}>Prénom</label>
                <input type="text" placeholder="Jean" required className="f-input" style={{ color: "var(--ink)" }} />
              </div>
              <div>
                <label className="f-label block mb-3" style={{ color: "var(--muted)" }}>Nom</label>
                <input type="text" placeholder="Dupont" required className="f-input" style={{ color: "var(--ink)" }} />
              </div>
            </div>

            <div>
              <label className="f-label block mb-3" style={{ color: "var(--muted)" }}>Email</label>
              <input type="email" placeholder="jean@exemple.com" required className="f-input" style={{ color: "var(--ink)" }} />
            </div>

            <div>
              <label className="f-label block mb-3" style={{ color: "var(--muted)" }}>Message</label>
              <textarea
                rows={4}
                placeholder="Votre message…"
                required
                className="f-input resize-none"
                style={{ color: "var(--ink)" }}
              />
            </div>

            <button
              type="submit"
              disabled={sending || sent}
              className="btn-ghost w-full justify-center disabled:opacity-50 mt-1"
              style={sent ? { borderColor: "var(--gold)", color: "var(--gold)" } : {}}
            >
              {sent ? "Message envoyé ✓" : sending ? "Envoi en cours…" : "Envoyer le message"}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 max-w-5xl mx-auto mt-24 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3"
        style={{ borderTop: "1px solid rgba(192,152,80,0.18)" }}
      >
        <span className="f-label" style={{ color: "var(--muted)" }}>
          © 2025 Grégoire Laurent. Tous droits réservés.
        </span>
        <span className="f-label" style={{ color: "var(--muted)" }}>
          Spécialité Réseaux · 3ème année Informatique
        </span>
      </div>
    </section>
  );
}
