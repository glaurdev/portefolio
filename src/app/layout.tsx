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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
