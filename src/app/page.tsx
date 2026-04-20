import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <div className="max-w-7xl mx-auto px-8"><div className="divider-gold" /></div>
        <About />
        <div className="max-w-7xl mx-auto px-8"><div className="divider-gold" /></div>
        <Skills />
        <div className="max-w-7xl mx-auto px-8"><div className="divider-gold" /></div>
        <Contact />
      </main>
    </>
  );
}
