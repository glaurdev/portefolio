import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grégoire LAURENT — Creative Developer",
  description: "Portfolio de Grégoire LAURENT — Développeur créatif spécialisé en expériences web immersives et interfaces 3D.",
  keywords: ["portfolio", "developer", "creative", "3D", "web design"],
  openGraph: {
    title: "Grégoire LAURENT — Creative Developer",
    description: "Expériences web immersives & interfaces 3D",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
