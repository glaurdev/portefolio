"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

const services = [
  { icon: "◈", label: "Supervision réseau",   desc: "Monitoring temps réel de tous les équipements réseau — switchs, routeurs, pare-feux." },
  { icon: "◉", label: "Métriques serveurs",   desc: "CPU, RAM, disques, I/O — chaque métrique collectée, historisée et alertée." },
  { icon: "◆", label: "Logs centralisés",     desc: "Agrégation de tous les journaux systèmes et applicatifs en un point unique." },
  { icon: "⬡", label: "Alerting intelligent", desc: "Seuils dynamiques, escalades automatiques, notifications multi-canaux." },
  { icon: "◎", label: "Dashboards",           desc: "Tableaux de bord personnalisés pour chaque couche de l'infrastructure." },
  { icon: "⬢", label: "Inventaire auto",      desc: "Découverte et inventaire automatique des assets réseau et systèmes." },
];

export default function InfraSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* ── PMM Callout — Apple "one more thing" style ── */}
      <section id="infra" className="bg-black py-40 px-6 flex flex-col items-center justify-center text-center">
        <Reveal>
          <p className="a-caption mb-5">Infrastructure · PMM</p>
          <h2 className="a-display text-white">
            PMM Platform.
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="mt-6 max-w-2xl">
          <p className="a-title-3">
            Déployée. Configurée. Administrée.
          </p>
        </Reveal>
        <Reveal delay={0.22} className="mt-5 max-w-xl">
          <p className="a-body text-center">
            Grégoire a conçu et mis en place une plateforme de Management
            et Monitoring complète pour superviser l'intégralité des services
            d'infrastructure — du réseau aux applications, en temps réel.
          </p>
        </Reveal>

        {/* Big stat row */}
        <Reveal delay={0.32} className="mt-16 w-full max-w-3xl">
          <div className="grid grid-cols-3 gap-px bg-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]">
            {[
              { value: "100%",  label: "Services supervisés" },
              { value: "24/7",  label: "Monitoring continu" },
              { value: "<1 s",  label: "Temps de réponse alerte" },
            ].map((s) => (
              <div key={s.label} className="bg-[#111] py-10 px-6 flex flex-col items-center gap-2">
                <span className="a-title-1 a-text-blue">{s.value}</span>
                <span className="text-xs uppercase tracking-widest text-[var(--t3)]">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Services grid ── */}
      <section className="bg-[var(--surface)] py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="a-caption mb-4">Ce qui est géré</p>
            <h3 className="a-title-1 text-white">
              Chaque service,{" "}
              <span className="a-text-blue">sous contrôle.</span>
            </h3>
          </Reveal>

          <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: i * 0.08, ease }}
                className="bg-[var(--surface-2)] rounded-2xl p-7 group hover:bg-[#2a2a2c] transition-colors duration-300"
                data-hover
              >
                <span className="text-2xl text-[var(--blue-l)] block mb-4" style={{ filter: "drop-shadow(0 0 8px #2997FF60)" }}>
                  {s.icon}
                </span>
                <h4 className="text-base font-semibold text-white mb-2">{s.label}</h4>
                <p className="text-sm text-[var(--t2)] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Admin role banner ── */}
      <section className="bg-black py-32 px-6 text-center">
        <Reveal>
          <p className="a-caption mb-5">Rôle</p>
          <h2 className="a-title-1 text-white max-w-4xl mx-auto leading-tight">
            Administrateur de tous{" "}
            <span className="a-text-blue">les services d'infrastructure.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-8 max-w-2xl mx-auto">
          <p className="a-body text-center">
            DNS, DHCP, Active Directory, VPN, pare-feux, virtualisation, reverse proxy,
            certificats TLS, sauvegardes — Grégoire administre chaque brique de l'infrastructure
            de bout en bout, seul et de manière autonome.
          </p>
        </Reveal>

        {/* Horizontal service tags */}
        <Reveal delay={0.25} className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {["DNS", "DHCP", "Active Directory", "VPN", "pfSense", "Proxmox", "Nginx", "TLS/PKI",
            "Grafana", "Prometheus", "Docker", "Sauvegardes", "VLAN", "OSPF"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full border border-[rgba(255,255,255,0.1)] text-[var(--t2)] text-xs font-medium tracking-wide hover:border-[var(--blue)] hover:text-white transition-all duration-200"
            >
              {tag}
            </span>
          ))}
        </Reveal>
      </section>
    </>
  );
}
