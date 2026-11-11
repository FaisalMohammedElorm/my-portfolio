import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Education from "@/components/education";
import CurrentExperience from "@/components/current-experience";
import Experience from "@/components/experience";
import Certificates from "@/components/certificates";
import Resume from "@/components/resume";
import Services from "@/components/services";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <CurrentExperience />
      <Experience />
      <Certificates />
      <Resume />
      <Services />
      <Contact />
    </>
  );
}
