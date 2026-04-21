"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Eyebrow fades in */
      gsap.from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.9, delay: 0.1, ease: "power3.out" });

      /* Title words slide up from clip */
      gsap.from(".hero-word", {
        y: "108%",
        duration: 1.15,
        stagger: 0.13,
        ease: "power4.out",
        delay: 0.2,
      });

      /* Gold rule scales from left */
      gsap.from(ruleRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        delay: 0.95,
        ease: "expo.inOut",
      });

      /* Subtitle & CTAs fade up staggered */
      gsap.from(".hero-fade", {
        opacity: 0,
        y: 22,
        duration: 1.0,
        stagger: 0.12,
        delay: 1.3,
        ease: "power3.out",
      });

      /* Scroll indicator */
      gsap.from(".hero-scroll", { opacity: 0, duration: 1, delay: 2.1, ease: "power2.out" });

      /* SVG architectural arcs draw themselves */
      const paths = gsap.utils.toArray<SVGGeometryElement>(".arc-path");
      paths.forEach((p, i) => {
        const len = p.getTotalLength?.() ?? 600;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: 1.8,
          delay: 0.8 + i * 0.16,
          ease: "power2.inOut",
        });
      });

      /* Parallax ghost text on scroll */
      gsap.to(".hero-ghost", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen bg-ink flex flex-col justify-center overflow-hidden"
    >
      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Architectural SVG arcs — right side */}
      <svg
        className="absolute right-0 top-0 h-full w-[44%] opacity-[0.17] text-gold pointer-events-none"
        viewBox="0 0 420 800"
        fill="none"
        preserveAspectRatio="xMaxYMid slice"
        aria-hidden="true"
      >
        <path className="arc-path" d="M 420 0 A 420 420 0 0 1 0 420" stroke="currentColor" strokeWidth="0.9" />
        <path className="arc-path" d="M 420 80 A 340 340 0 0 1 80 420" stroke="currentColor" strokeWidth="0.7" />
        <path className="arc-path" d="M 420 158 A 262 262 0 0 1 158 420" stroke="currentColor" strokeWidth="0.6" />
        <path className="arc-path" d="M 420 236 A 184 184 0 0 1 236 420" stroke="currentColor" strokeWidth="0.5" />
        <path className="arc-path" d="M 0 280 L 420 280" stroke="currentColor" strokeWidth="0.35" opacity="0.6" />
        <path className="arc-path" d="M 280 0 L 280 800" stroke="currentColor" strokeWidth="0.35" opacity="0.6" />
        <path className="arc-path" d="M 272 272 L 288 272 M 280 264 L 280 288" stroke="currentColor" strokeWidth="0.9" />
        <circle className="arc-path" cx="280" cy="280" r="12" stroke="currentColor" strokeWidth="0.7" />
        <circle className="arc-path" cx="280" cy="280" r="3"  stroke="currentColor" strokeWidth="1.4" />
        <path className="arc-path" d="M 340 600 L 420 600" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        <path className="arc-path" d="M 380 560 L 380 640" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      </svg>

      {/* Ghost parallax text */}
      <div className="hero-ghost absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <p className="font-serif text-[22vw] font-light leading-none tracking-tighter pl-4 text-parchment/[0.025]">
          réseau
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-24 pt-28 pb-24">

        <p className="hero-eyebrow f-label text-gold/65 mb-10">
          Étudiant Informatique · Spécialité Réseaux · 3ème année
        </p>

        <div className="mb-10">
          <div className="overflow-hidden leading-none mb-1">
            <h1 className="hero-word f-display text-parchment inline-block">Grégoire</h1>
          </div>
          <div className="overflow-hidden leading-none">
            <h1 className="hero-word f-display text-parchment italic inline-block">Laurent.</h1>
          </div>
        </div>

        <div
          ref={ruleRef}
          className="w-40 h-px mb-11 origin-left"
          style={{ background: "linear-gradient(90deg,#C09850,rgba(192,152,80,0.15))" }}
        />

        <p className="hero-fade f-subtitle text-stone mb-12 max-w-[420px]">
          Administrateur d'infrastructure.<br />Architecte réseau. Concepteur<br />de la plateforme PMM.
        </p>

        <div className="flex items-center gap-9 flex-wrap">
          <a href="#projects" className="hero-fade link-gold">
            Voir les projets
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#contact" className="hero-fade btn-ghost">
            Me contacter
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 left-8 lg:left-24 flex items-center gap-3" aria-hidden="true">
        <div className="relative w-px h-14 overflow-hidden" style={{ background: "rgba(122,110,95,0.2)" }}>
          <div className="absolute inset-x-0 top-0 h-5 scroll-drop" style={{ background: "#C09850" }} />
        </div>
        <span className="f-label text-stone/35">défiler</span>
      </div>
    </section>
  );
}
