import "./App.css";
import AuroraBackground from "./components/reactbits/AuroraBackground.jsx";
import BlobCursor from "./components/reactbits/BlobCursor.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/sections/Hero.jsx";
import Stats from "./components/sections/Stats.jsx";
import About from "./components/sections/About.jsx";
import Portfolio from "./components/sections/Portfolio.jsx";
import WorkStack from "./components/sections/WorkStack.jsx";
import Services from "./components/sections/Services.jsx";
import Process from "./components/sections/Process.jsx";
import Testimonials from "./components/sections/Testimonials.jsx";
import Contact from "./components/sections/Contact.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <AuroraBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.12),transparent_35%)]" />
      <div className="absolute inset-x-0 top-[120px] h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-50" />
      <div className="relative z-10">
        <NavBar />
        <main className="space-y-20 pb-12 pt-4 sm:space-y-24">
          <Hero />
          <Stats />
          <About />
          <Portfolio />
          <WorkStack />
          <Services />
          <Process />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
      <BlobCursor />
    </div>
  );
}
