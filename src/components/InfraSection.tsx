"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  { icon: "◈", title: "Supervision",     desc: "Prometheus + Grafana · dashboards temps réel" },
  { icon: "◉", title: "Métriques",       desc: "Node Exporter · collecte SNMP · Telegraf" },
  { icon: "◎", title: "Centralisation",  desc: "ELK Stack · Loki · syslog centralisé" },
  { icon: "◇", title: "Alerting",        desc: "Alertmanager · PagerDuty · Slack webhooks" },
  { icon: "◈", title: "Virtualisation",  desc: "Proxmox VE · Docker · LXC · KVM" },
  { icon: "◉", title: "Réseaux",         desc: "pfSense · OSPF · VLANs · BGP · VPN" },
];

function Counter({ target, trigger }: { target: number; trigger: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const duration = 1800;
    const start = performance.now();
    function frame(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }, [trigger, target]);
  return <>{count}</>;
}

export default function InfraSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counterOn, setCounterOn] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".infra-label", {
        opacity: 0, x: -18, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".infra-label", start: "top 88%" },
      });

      gsap.from(".infra-headline", {
        opacity: 0, y: 35, duration: 1.1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".infra-headline", start: "top 82%" },
      });

      ScrollTrigger.create({
        trigger: ".infra-stats",
        start: "top 82%",
        onEnter: () => setCounterOn(true),
      });

      gsap.from(".infra-stat", {
        opacity: 0, y: 28, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".infra-stats", start: "top 82%" },
      });

      gsap.from(".service-card", {
        opacity: 0, y: 32, duration: 0.85, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".service-card", start: "top 84%" },
      });

      /* Horizontal rule draws */
      const lines = gsap.utils.toArray<SVGGeometryElement>(".infra-line");
      lines.forEach((l) => {
        const len = l.getTotalLength?.() ?? 300;
        gsap.set(l, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(l, {
          strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="infra"
      className="relative overflow-hidden py-32 px-8 bg-ink"
    >
      <div className="grain" aria-hidden="true" />

      {/* Decorative SVG lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" aria-hidden="true">
        <line className="infra-line" x1="0" y1="50%" x2="100%" y2="50%" stroke="#C09850" strokeWidth="1" />
        <line className="infra-line" x1="50%" y1="0" x2="50%" y2="100%" stroke="#C09850" strokeWidth="1" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Label */}
        <p className="infra-label f-label mb-16" style={{ color: "var(--gold)" }}>
          Plateforme PMM
        </p>

        {/* Headline */}
        <div className="mb-20 max-w-3xl">
          <div className="overflow-hidden mb-2">
            <h2 className="infra-headline f-title text-parchment">L'infrastructure,</h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="infra-headline f-title italic" style={{ color: "var(--gold)" }}>entièrement supervisée.</h2>
          </div>
          <p className="infra-headline f-subtitle mt-8 max-w-xl" style={{ color: "var(--stone)" }}>
            Conception et déploiement d'une plateforme de Management & Monitoring complète pour l'ensemble des services de l'établissement.
          </p>
        </div>

        {/* Stats row */}
        <div className="infra-stats grid grid-cols-3 gap-px mb-20 max-w-2xl" style={{ border: "1px solid rgba(192,152,80,0.18)" }}>
          {[
            { num: 100, suffix: "%", label: "Services supervisés" },
            { num: 24,  suffix: "/7", label: "Disponibilité" },
            { num: 1,   suffix: "s",  label: "Latence alerting" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="infra-stat p-8 text-center"
              style={{ borderRight: i < 2 ? "1px solid rgba(192,152,80,0.18)" : "none" }}
            >
              <p className="font-serif font-light mb-1" style={{ fontSize: "clamp(36px,5vw,64px)", color: "var(--gold)", lineHeight: 1 }}>
                <Counter target={s.num} trigger={counterOn} />{s.suffix}
              </p>
              <p className="f-label" style={{ color: "var(--muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: "1px solid rgba(192,152,80,0.12)" }}>
          {services.map((s) => (
            <div
              key={s.title}
              className="service-card p-8 group transition-colors duration-300 hover:bg-parchment/[0.04]"
              style={{ borderRight: "1px solid rgba(192,152,80,0.12)", borderBottom: "1px solid rgba(192,152,80,0.12)" }}
            >
              <span className="block f-label mb-4 group-hover:text-gold transition-colors duration-300" style={{ color: "var(--gold)", opacity: 0.5 }}>
                {s.icon}
              </span>
              <h3 className="font-serif text-xl font-light mb-2 text-parchment">{s.title}</h3>
              <p className="f-body-sm" style={{ color: "var(--stone)" }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Admin tags */}
        <div className="mt-16 flex flex-wrap gap-3">
          {["DNS","DHCP","Active Directory","pfSense","Proxmox VE","OpenVPN","WireGuard","Nginx","PKI","Ansible","Docker","Zabbix"].map((tag) => (
            <span
              key={tag}
              className="f-label px-4 py-2 transition-all duration-300 hover:border-gold/50"
              style={{ border: "1px solid rgba(192,152,80,0.22)", color: "var(--stone)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
