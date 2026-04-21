import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grégoire Laurent — Étudiant Informatique · Réseaux",
  description: "Portfolio de Grégoire Laurent — Étudiant en 3ème année d'informatique, spécialité Réseaux. Administrateur d'infrastructure et concepteur de la plateforme PMM.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
