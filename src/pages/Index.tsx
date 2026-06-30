import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Apps } from "@/components/Apps";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Awards } from "@/components/Awards";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen" id="home">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Apps />
      <Skills />
      <Education />
      <Awards />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
