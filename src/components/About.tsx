"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: "3",    label: "ans de formation" },
  { value: "100%", label: "services supervisés" },
  { value: "PMM",  label: "plateforme conçue" },
  { value: "24/7", label: "disponibilité infra" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".about-label", {
        opacity: 0, x: -18, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      gsap.from(".about-initial", {
        opacity: 0, scale: 0.65, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: ".about-initial", start: "top 88%" },
      });

      gsap.from(".about-text", {
        opacity: 0, y: 28, duration: 1.0, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".about-text", start: "top 84%" },
      });

      gsap.from(".about-stat", {
        opacity: 0, y: 22, duration: 0.9, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".about-stat", start: "top 86%" },
      });

      /* Botanical SVG draws on scroll */
      const paths = gsap.utils.toArray<SVGGeometryElement>(".botanical-path");
      paths.forEach((p, i) => {
        const len = p.getTotalLength?.() ?? 200;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center 30%",
            scrub: 1,
          },
          delay: i * 0.04,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden py-32 px-8"
      style={{ backgroundColor: "var(--parchment)", color: "var(--ink)" }}
    >
      {/* Grain (lighter for parchment) */}
      <div className="grain" style={{ opacity: 0.5 }} aria-hidden="true" />

      {/* Botanical SVG — right margin */}
      <svg
        className="absolute right-0 top-0 h-full w-[240px] text-gold pointer-events-none"
        style={{ opacity: 0.55 }}
        viewBox="0 0 120 600"
        fill="none"
        preserveAspectRatio="xMaxYMid meet"
        aria-hidden="true"
      >
        <path className="botanical-path" d="M 60 590 C 56 510 64 430 57 355 C 51 298 44 242 59 188 C 71 142 80 96 64 50 C 57 28 49 12 60 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path className="botanical-path" d="M 57 385 C 40 368 26 350 20 328 C 14 306 24 290 37 295 C 46 299 50 309 48 318" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" />
        <path className="botanical-path" d="M 60 348 C 76 330 92 314 96 292 C 100 270 87 256 75 262 C 67 267 64 278 66 287" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" />
        <path className="botanical-path" d="M 58 268 C 42 250 28 232 24 210 C 20 189 32 175 45 181 C 53 185 57 196 55 205" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
        <path className="botanical-path" d="M 62 232 C 78 214 93 196 95 174 C 97 152 83 140 70 148 C 62 154 60 165 62 174" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
        <path className="botanical-path" d="M 60 152 C 44 136 35 118 35 102 C 35 88 44 82 52 87" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <path className="botanical-path" d="M 63 130 C 77 112 84 94 80 80 C 76 66 64 62 58 69" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <ellipse className="botanical-path" cx="23" cy="326" rx="5" ry="9" transform="rotate(-25 23 326)" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <ellipse className="botanical-path" cx="95" cy="290" rx="5" ry="9" transform="rotate(22 95 290)"  stroke="currentColor" strokeWidth="0.8" fill="none" />
        <ellipse className="botanical-path" cx="22" cy="208" rx="4" ry="8" transform="rotate(-20 22 208)" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <ellipse className="botanical-path" cx="94" cy="172" rx="4" ry="8" transform="rotate(18 94 172)"  stroke="currentColor" strokeWidth="0.8" fill="none" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto">

        <p className="about-label f-label mb-16" style={{ color: "var(--gold)" }}>À propos</p>

        <div className="grid lg:grid-cols-[1fr_1.8fr] gap-20 lg:gap-24 items-start">

          {/* Left — illuminated initial + bio */}
          <div>
            <div className="about-initial select-none mb-8" aria-hidden="true">
              <span
                className="font-serif font-light block leading-none"
                style={{ fontSize: "clamp(96px,13vw,172px)", color: "rgba(192,152,80,0.18)" }}
              >
                G
              </span>
            </div>

            <p className="about-text f-body mb-6" style={{ color: "var(--charcoal)" }}>
              Étudiant en troisième année d'informatique, spécialisé en réseaux et systèmes. Passionné par l'architecture d'infrastructure et l'automatisation.
            </p>
            <p className="about-text f-body-sm" style={{ color: "var(--stone)" }}>
              Concepteur et administrateur de la plateforme PMM de mon établissement — une infrastructure complète réunissant supervision, métriques, centralisation des logs et alerting pour l'ensemble des services.
            </p>
          </div>

          {/* Right — stats + info */}
          <div>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px mb-12" style={{ border: "1px solid rgba(192,152,80,0.2)" }}>
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="about-stat p-7"
                  style={{
                    borderRight:  i % 2 === 0 ? "1px solid rgba(192,152,80,0.2)" : "none",
                    borderBottom: i < 2      ? "1px solid rgba(192,152,80,0.2)" : "none",
                  }}
                >
                  <p className="font-serif font-light mb-1" style={{ fontSize: "clamp(28px,3.8vw,50px)", color: "var(--gold)", lineHeight: 1.1 }}>
                    {s.value}
                  </p>
                  <p className="f-label" style={{ color: "var(--stone)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Info rows */}
            <div className="about-text space-y-4">
              {[
                ["Formation",  "IUT Informatique — Spécialité Réseaux"],
                ["Année",      "3ème année · 2025"],
                ["Domaine",    "Administration système & réseau"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline gap-6 pb-4"
                  style={{ borderBottom: "1px solid rgba(192,152,80,0.15)" }}
                >
                  <span className="f-label w-24 shrink-0" style={{ color: "var(--muted)" }}>{k}</span>
                  <span className="f-body-sm" style={{ color: "var(--charcoal)" }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="about-text mt-8 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inset-0 rounded-full opacity-55" style={{ backgroundColor: "var(--gold)" }} />
                <span className="relative flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: "var(--gold)" }} />
              </span>
              <span className="f-label" style={{ color: "var(--stone)" }}>Disponible pour un stage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
