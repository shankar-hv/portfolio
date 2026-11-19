import { NeonCursor, ParticleField, ScrollProgress } from "../components/Effects";
import {
  Contact, Footer, Hero, Navbar, Process, Projects, Services, StackMarquee, Stats, Testimonials,
} from "../components/Sections";

export default function NeonTemplate() {
  return (
    <div className="text-[#e6e8ff] selection:bg-magenta selection:text-white">
      <ParticleField />
      <NeonCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Projects />
        <StackMarquee />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
