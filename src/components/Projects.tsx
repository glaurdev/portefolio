"use client";
import { motion, useInView } from "framer-motion";
import { useRef, MouseEvent } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const projects = [
  {
    num: "01",
    eyebrow: "Infrastructure · Monitoring",
    title: "PMM Platform",
    tagline: "L'infrastructure, entièrement supervisée.",
    desc: "Conception et déploiement d'une plateforme de Management et Monitoring complète. Collecte de métriques, centralisation des logs, alerting automatisé et dashboards temps réel pour l'ensemble des services.",
    stack: ["Proxmox", "Grafana", "Prometheus", "Ansible", "Docker"],
    accent: "#0071E3",
  },
  {
    num: "02",
    eyebrow: "Réseaux · Architecture",
    title: "Infrastructure Réseau",
    tagline: "Routé. Segmenté. Sécurisé.",
    desc: "Conception complète d'une architecture réseau multi-sites avec segmentation VLAN, routage dynamique OSPF, filtrage pare-feu stateful et haute disponibilité via redondance de liens.",
    stack: ["pfSense", "Cisco", "OSPF", "VLANs", "BGP"],
    accent: "#2997FF",
  },
  {
    num: "03",
    eyebrow: "Administration · Services",
    title: "Services d'Infrastructure",
    tagline: "Chaque service, disponible.",
    desc: "Administration complète des services réseau et système : DNS autoritaire, DHCP centralisé, Active Directory, VPN site-à-site, PKI interne, reverse proxy TLS et politique de sauvegarde 3-2-1.",
    stack: ["Linux", "Windows Server", "Nginx", "OpenVPN", "PKI"],
    accent: "#30D158",
  },
  {
    num: "04",
    eyebrow: "Développement · Automatisation",
    title: "Network Automation",
    tagline: "Le réseau, piloté par le code.",
    desc: "Développement d'outils d'automatisation réseau en Python : scripts de configuration batch via Netmiko, collecte SNMP, génération de rapports d'inventaire et API REST de supervision.",
    stack: ["Python", "Netmiko", "SNMP", "Bash", "REST API"],
    accent: "#FF9F0A",
  },
];

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.015,1.015,1.015)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} className={`transition-transform duration-200 ${className}`} style={{ transformStyle: "preserve-3d" }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="projects" className="bg-[var(--surface)] py-28 px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          ref={ref} className="text-center mb-20"
        >
          <p className="a-caption mb-5">Projets</p>
          <h2 className="a-title-1 text-white">
            Du concret.{" "}
            <span className="a-text-blue">Du terrain.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease }}
            >
              <TiltCard>
                <div
                  className="bg-[var(--surface-2)] rounded-2xl p-8 h-full flex flex-col justify-between group hover:bg-[#2a2a2c] transition-colors duration-300 border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.09)]"
                  data-hover
                >
                  {/* Top */}
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-2" style={{ color: p.accent }}>
                          {p.eyebrow}
                        </p>
                        <span className="text-[var(--t4)] text-xs font-mono">{p.num}</span>
                      </div>
                      <a
                        href="#"
                        data-hover
                        className="w-9 h-9 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[var(--t3)] hover:border-[var(--blue-l)] hover:text-[var(--blue-l)] transition-all duration-200 group-hover:scale-110"
                      >
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{p.title}</h3>
                    <p className="text-sm font-medium mb-4" style={{ color: p.accent }}>{p.tagline}</p>
                    <p className="text-sm text-[var(--t2)] leading-[1.65]">{p.desc}</p>
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2 mt-8">
                    {p.stack.map((t) => (
                      <span key={t} className="text-[10px] px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.07)] text-[var(--t3)] font-medium tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
