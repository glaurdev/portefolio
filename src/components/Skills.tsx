"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const specs = [
  {
    category: "Réseaux",
    accent: "#C09850",
    items: [
      { name: "Protocoles",  value: "TCP/IP · UDP · ICMP · ARP · NDP" },
      { name: "Routage",     value: "OSPF · BGP · RIP · statique" },
      { name: "Switching",   value: "VLANs 802.1Q · STP · LACP" },
      { name: "VPN",         value: "OpenVPN · WireGuard · IPSec · SSL/TLS" },
      { name: "Firewall",    value: "pfSense · iptables · NAT · stateful" },
      { name: "Sans-fil",    value: "Wi-Fi 802.11 a/b/g/n/ac" },
    ],
  },
  {
    category: "Systèmes",
    accent: "#D4B87A",
    items: [
      { name: "Linux",          value: "Debian · Ubuntu Server · Alpine · CentOS" },
      { name: "Windows Server", value: "Active Directory · GPO · DNS · DHCP" },
      { name: "Virtualisation", value: "Proxmox VE · VMware ESXi · KVM · LXC" },
      { name: "Conteneurs",     value: "Docker · Compose · Portainer" },
      { name: "Stockage",       value: "NFS · iSCSI · ZFS · RAID · 3-2-1" },
      { name: "PKI",            value: "Certificats TLS · CA interne" },
    ],
  },
  {
    category: "Supervision",
    accent: "#C09850",
    items: [
      { name: "Monitoring", value: "Prometheus · Grafana · Zabbix · PRTG" },
      { name: "Logs",       value: "ELK Stack · Loki · syslog centralisé" },
      { name: "Alerting",   value: "Alertmanager · PagerDuty · Slack" },
      { name: "Collecte",   value: "SNMP · Node Exporter · Telegraf" },
      { name: "Inventaire", value: "Découverte automatique · CMDB" },
      { name: "Rapports",   value: "Dashboards · SLA · capacity planning" },
    ],
  },
  {
    category: "Développement",
    accent: "#D4B87A",
    items: [
      { name: "Langages",       value: "Python · Bash · C · JavaScript" },
      { name: "Automatisation", value: "Ansible · Netmiko · API REST" },
      { name: "Outils réseau",  value: "Scapy · Wireshark · Nmap · tcpdump" },
      { name: "Versioning",     value: "Git · GitHub · GitLab CI/CD" },
      { name: "IaC",            value: "Terraform (bases) · cloud-init" },
      { name: "Scripting",      value: "cron · systemd · automatisation infra" },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".skills-label", {
        opacity: 0, x: -18, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".skills-label", start: "top 88%" },
      });

      gsap.from(".skills-headline", {
        opacity: 0, y: 35, duration: 1.1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".skills-headline", start: "top 82%" },
      });

      gsap.from(".skills-group", {
        opacity: 0, y: 36, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".skills-group", start: "top 84%" },
      });

      /* SVG underline draws */
      const lines = gsap.utils.toArray<SVGGeometryElement>(".skills-underline");
      lines.forEach((l) => {
        const len = l.getTotalLength?.() ?? 200;
        gsap.set(l, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(l, {
          strokeDashoffset: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: l, start: "top 85%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden py-32 px-8 bg-ink"
    >
      <div className="grain" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <p className="skills-label f-label mb-16" style={{ color: "var(--gold)" }}>
          Caractéristiques techniques
        </p>

        <div className="mb-20">
          <div className="overflow-hidden mb-1">
            <h2 className="skills-headline f-title text-parchment">Tech</h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="skills-headline f-title italic" style={{ color: "var(--gold)" }}>Specs.</h2>
          </div>
        </div>

        {/* Spec groups */}
        <div className="flex flex-col gap-12">
          {specs.map((group) => (
            <div key={group.category} className="skills-group">

              {/* Category heading with animated underline */}
              <div className="flex items-center gap-4 mb-1 pb-4 relative">
                <h3
                  className="font-serif font-light"
                  style={{ fontSize: "clamp(22px,3vw,36px)", color: "var(--parchment)" }}
                >
                  {group.category}
                </h3>
                <svg
                  className="flex-1 h-px overflow-visible"
                  viewBox="0 0 100 1"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <line
                    className="skills-underline"
                    x1="0" y1="0.5" x2="100" y2="0.5"
                    stroke={group.accent}
                    strokeWidth="0.8"
                    strokeOpacity="0.35"
                  />
                </svg>
              </div>

              {/* Spec rows */}
              <div>
                {group.items.map((item, ii) => (
                  <div
                    key={item.name}
                    className="grid grid-cols-[160px_1fr] md:grid-cols-[200px_1fr] gap-6 px-0 py-3.5 transition-colors duration-200 hover:bg-parchment/[0.03] group"
                    style={{
                      borderBottom: ii < group.items.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                    }}
                  >
                    <span className="f-label" style={{ color: "var(--muted)" }}>{item.name}</span>
                    <span className="f-body-sm transition-colors duration-200 group-hover:text-parchment" style={{ color: "var(--stone)" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
