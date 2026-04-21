import dynamic from "next/dynamic";
import Navigation   from "@/components/Navigation";
import Hero         from "@/components/Hero";
import About        from "@/components/About";
import InfraSection from "@/components/InfraSection";
import Projects     from "@/components/Projects";
import Skills       from "@/components/Skills";
import Contact      from "@/components/Contact";

const CustomCursor   = dynamic(() => import("@/components/CustomCursor"),   { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <main>
        {/* 1 — Hero plein écran avec réseau 3D */}
        <Hero />

        {/* 2 — "Bonjour" + bio profil */}
        <About />

        {/* 3 — PMM & administration d'infrastructure */}
        <InfraSection />

        {/* 4 — Projets */}
        <Projects />

        {/* 5 — Tech specs */}
        <Skills />

        {/* 6 — Contact + footer */}
        <Contact />
      </main>
    </>
  );
}
