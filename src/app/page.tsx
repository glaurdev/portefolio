import SmoothScroll  from "@/components/SmoothScroll";
import Navigation    from "@/components/Navigation";
import Hero          from "@/components/Hero";
import About         from "@/components/About";
import InfraSection  from "@/components/InfraSection";
import Projects      from "@/components/Projects";
import Skills        from "@/components/Skills";
import Contact       from "@/components/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      <main>
        <Hero />
        <About />
        <InfraSection />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
