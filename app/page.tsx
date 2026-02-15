import Hero from "@/components/hero";
import Services from "@/components/service";
import Projects from "@/components/projects";
import About from "@/components/about";
import Skills from "@/components/skills";
import Experience from "@/components/experients";
import Contact from "@/components/contacs";
import Footer from "@/components/footers";
import Header from "@/components/header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#14002b] via-[#0d0d14] to-black text-white">
      <Hero />
      <Services />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
      <Header/>
    </main>
  );
}
