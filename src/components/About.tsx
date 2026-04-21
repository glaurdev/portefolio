"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <>
      {/* ── Hello section ── */}
      <section id="about" className="bg-black py-32 px-6 flex flex-col items-center justify-center text-center min-h-[55vh]">
        <Reveal>
          <h2 className="a-display text-white">
            Bonjour,{" "}
            <span className="a-text-blue">les réseaux.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14} className="mt-7 max-w-2xl">
          <p className="a-title-3">
            Grégoire Laurent, étudiant en 3ème année d'informatique,
            spécialité Réseaux. Là où les paquets transitent, les services
            tournent et l'infrastructure vit — c'est son terrain.
          </p>
        </Reveal>
      </section>

      {/* ── Profile grid ── */}
      <section className="bg-[var(--surface)] py-28 px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          {/* Visual — orbit diagram */}
          <Reveal className="relative aspect-square max-w-[420px] mx-auto w-full">
            {[
              { inset: "0%",  color: "rgba(0,113,227,0.18)", dur: "22s" },
              { inset: "16%", color: "rgba(41,151,255,0.14)", dur: "15s", rev: true },
              { inset: "32%", color: "rgba(0,113,227,0.1)",  dur: "28s" },
            ].map((ring, i) => (
              <div
                key={i}
                className="absolute rounded-full border"
                style={{
                  inset: ring.inset,
                  borderColor: ring.color,
                  animation: `${ring.dur} linear infinite ${ring.rev ? "reverse" : ""} running`,
                  animationName: "spin360",
                }}
              />
            ))}
            <style>{`@keyframes spin360 { to { transform: rotate(360deg); } }`}</style>
            {/* Dot on first ring */}
            <div className="absolute" style={{ inset: "0%", animation: "22s linear infinite spin360" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[var(--blue-l)] shadow-[0_0_12px_#2997FF]" />
            </div>
            {/* Center */}
            <div className="absolute inset-[38%] rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(0,113,227,0.08)] flex items-center justify-center">
              <span className="text-sm font-bold text-white tracking-wide">GL</span>
            </div>
          </Reveal>

          {/* Bio */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <p className="a-caption">Profil</p>
              <h3 className="a-title-1 text-white mt-3">
                Architecte des<br />
                <span className="a-text-blue">infrastructures modernes.</span>
              </h3>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="a-body">
                Passionné par les réseaux depuis ses premières années d'études,
                Grégoire a rapidement dépassé le cadre théorique pour concevoir,
                déployer et administrer des infrastructures réelles — serveurs,
                routeurs, services et supervision inclus.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="a-body">
                Aujourd'hui, il gère l'ensemble des services d'infrastructure
                de son environnement : de la couche réseau aux services applicatifs,
                en passant par la virtualisation et la sécurité.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { k: "Formation",     v: "3ème année Informatique" },
                  { k: "Spécialité",    v: "Réseaux & Télécoms" },
                  { k: "Rôle",          v: "Administrateur infrastructure" },
                  { k: "Localisation",  v: "France" },
                ].map((f) => (
                  <div key={f.k} className="bg-[var(--surface-2)] rounded-xl p-4">
                    <p className="text-[11px] uppercase tracking-wider text-[var(--t4)] mb-1">{f.k}</p>
                    <p className="text-sm font-medium text-[var(--t1)]">{f.v}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
