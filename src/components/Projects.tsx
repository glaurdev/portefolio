"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    num: "01",
    eyebrow: "Infrastructure · Monitoring",
    title: "PMM Platform",
    tagline: "L'infrastructure, entièrement supervisée.",
    desc: "Conception et déploiement d'une plateforme de Management & Monitoring complète. Collecte de métriques, centralisation des logs, alerting automatisé et dashboards temps réel pour l'ensemble des services.",
    stack: ["Proxmox", "Grafana", "Prometheus", "Ansible", "Docker"],
    accent: "#C09850",
  },
  {
    num: "02",
    eyebrow: "Réseaux · Architecture",
    title: "Infrastructure Réseau",
    tagline: "Routé. Segmenté. Sécurisé.",
    desc: "Conception complète d'une architecture réseau multi-sites avec segmentation VLAN, routage dynamique OSPF, filtrage pare-feu stateful et haute disponibilité via redondance de liens.",
    stack: ["pfSense", "Cisco", "OSPF", "VLANs", "BGP"],
    accent: "#D4B87A",
  },
  {
    num: "03",
    eyebrow: "Administration · Services",
    title: "Services d'Infrastructure",
    tagline: "Chaque service, disponible.",
    desc: "Administration complète des services réseau : DNS autoritaire, DHCP centralisé, Active Directory, VPN site-à-site, PKI interne, reverse proxy TLS et politique de sauvegarde 3-2-1.",
    stack: ["Linux", "Windows Server", "Nginx", "OpenVPN", "PKI"],
    accent: "#C09850",
  },
  {
    num: "04",
    eyebrow: "Développement · Automatisation",
    title: "Network Automation",
    tagline: "Le réseau, piloté par le code.",
    desc: "Développement d'outils d'automatisation réseau en Python : scripts de configuration batch via Netmiko, collecte SNMP, génération de rapports d'inventaire et API REST de supervision.",
    stack: ["Python", "Netmiko", "SNMP", "Bash", "REST API"],
    accent: "#D4B87A",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".projects-label", {
        opacity: 0, x: -18, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".projects-label", start: "top 88%" },
      });

      gsap.from(".projects-headline", {
        opacity: 0, y: 35, duration: 1.1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".projects-headline", start: "top 82%" },
      });

      gsap.from(".project-card", {
        opacity: 0, y: 48, duration: 1.0, stagger: 0.13, ease: "power3.out",
        scrollTrigger: { trigger: ".project-card", start: "top 84%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden py-32 px-8"
      style={{ backgroundColor: "var(--parchment)", color: "var(--ink)" }}
    >
      <div className="grain" style={{ opacity: 0.5 }} aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <p className="projects-label f-label mb-16" style={{ color: "var(--gold)" }}>Projets</p>

        <div className="mb-20">
          <div className="overflow-hidden mb-1">
            <h2 className="projects-headline f-title" style={{ color: "var(--ink)" }}>Du concret.</h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="projects-headline f-title italic" style={{ color: "var(--gold)" }}>Du terrain.</h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-px" style={{ border: "1px solid rgba(192,152,80,0.15)" }}>
          {projects.map((p) => (
            <article
              key={p.num}
              className="project-card p-10 flex flex-col gap-8 cursor-pointer group"
              style={{ backgroundColor: "var(--parchment)", borderRight: "1px solid rgba(192,152,80,0.15)", borderBottom: "1px solid rgba(192,152,80,0.15)" }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="f-label mb-2" style={{ color: p.accent }}>{p.eyebrow}</p>
                  <span className="f-label" style={{ color: "var(--muted)", opacity: 0.6 }}>{p.num}</span>
                </div>

                {/* Arrow link */}
                <span
                  className="w-10 h-10 flex items-center justify-center border transition-all duration-300 group-hover:border-gold group-hover:text-gold"
                  style={{ border: "1px solid rgba(192,152,80,0.25)", color: "var(--muted)", borderRadius: 0 }}
                  aria-hidden="true"
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Large ghost number behind title */}
                <div className="relative">
                  <span
                    className="absolute -top-4 -left-2 font-serif font-light leading-none select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-10"
                    style={{ fontSize: "clamp(64px,8vw,100px)", color: "var(--gold)", opacity: 0.06 }}
                    aria-hidden="true"
                  >
                    {p.num}
                  </span>
                  <h3 className="f-title-sm relative z-10 mb-2" style={{ color: "var(--ink)" }}>{p.title}</h3>
                </div>

                <p className="f-label mb-5 mt-1" style={{ color: p.accent }}>{p.tagline}</p>
                <p className="f-body-sm leading-relaxed" style={{ color: "var(--stone)" }}>{p.desc}</p>
              </div>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="f-label px-3 py-1.5 transition-colors duration-300"
                    style={{ border: "1px solid rgba(192,152,80,0.2)", color: "var(--stone)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
