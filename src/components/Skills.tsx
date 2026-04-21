"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const specs = [
  {
    category: "Réseaux",
    color: "#0071E3",
    items: [
      { name: "Protocoles",     value: "TCP/IP, UDP, ICMP, ARP, NDP" },
      { name: "Routage",        value: "OSPF, BGP, RIP, routage statique" },
      { name: "Switching",      value: "VLANs (802.1Q), STP, LACP, port-channel" },
      { name: "Sans-fil",       value: "Wi-Fi 802.11 a/b/g/n/ac" },
      { name: "VPN",            value: "OpenVPN, WireGuard, IPSec, SSL/TLS" },
      { name: "Firewall",       value: "pfSense, iptables, filtrage stateful, NAT" },
    ],
  },
  {
    category: "Systèmes",
    color: "#2997FF",
    items: [
      { name: "Linux",          value: "Debian, Ubuntu Server, CentOS, Alpine" },
      { name: "Windows Server", value: "Active Directory, GPO, DNS, DHCP, WSUS" },
      { name: "Virtualisation", value: "Proxmox VE, VMware ESXi, KVM, LXC" },
      { name: "Conteneurs",     value: "Docker, Docker Compose, Portainer" },
      { name: "Stockage",       value: "NFS, iSCSI, ZFS, RAID, sauvegardes 3-2-1" },
      { name: "PKI",            value: "Gestion certificats TLS, CA interne" },
    ],
  },
  {
    category: "Supervision",
    color: "#30D158",
    items: [
      { name: "Monitoring",     value: "Prometheus, Grafana, Zabbix, PRTG" },
      { name: "Logs",           value: "ELK Stack, Loki, syslog centralisé" },
      { name: "Alerting",       value: "Alertmanager, PagerDuty, Slack webhooks" },
      { name: "Collecte",       value: "SNMP, Node Exporter, Telegraf, Beats" },
      { name: "Inventaire",     value: "Découverte automatique, CMDB" },
      { name: "Rapports",       value: "Tableaux de bord, SLA, capacity planning" },
    ],
  },
  {
    category: "Développement",
    color: "#FF9F0A",
    items: [
      { name: "Langages",       value: "Python, Bash, C, JavaScript" },
      { name: "Automatisation", value: "Ansible, scripts Netmiko, API REST" },
      { name: "Outils réseau",  value: "Scapy, Wireshark, Nmap, tcpdump" },
      { name: "Versioning",     value: "Git, GitHub, GitLab CI/CD" },
      { name: "IaC",            value: "Terraform (bases), cloud-init" },
      { name: "Scripting",      value: "Automatisation tâches infra, cron, systemd" },
    ],
  },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="bg-black py-28 px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-20"
        >
          <p className="a-caption mb-5">Caractéristiques techniques</p>
          <h2 className="a-title-1 text-white">
            Tech{" "}
            <span className="a-text-blue">Specs.</span>
          </h2>
          <p className="a-title-3 mt-5 max-w-xl mx-auto">
            Ce que Grégoire maîtrise, du protocole réseau au script d'automatisation.
          </p>
        </motion.div>

        {/* Spec sheets — Apple tech specs style */}
        <div className="flex flex-col gap-6">
          {specs.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: gi * 0.1, ease }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-3 px-1">
                <div className="w-2 h-2 rounded-full" style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }} />
                <span className="text-sm font-semibold text-white tracking-tight">{group.category}</span>
              </div>

              {/* Spec rows — Apple style table */}
              <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)]">
                {group.items.map((item, ii) => (
                  <div
                    key={item.name}
                    className={`grid grid-cols-[180px_1fr] md:grid-cols-[220px_1fr] gap-4 px-6 py-4 ${
                      ii < group.items.length - 1 ? "border-b border-[rgba(255,255,255,0.05)]" : ""
                    } bg-[var(--surface)] hover:bg-[#242426] transition-colors duration-200`}
                  >
                    <span className="text-sm text-[var(--t3)] font-medium">{item.name}</span>
                    <span className="text-sm text-[var(--t1)]">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
