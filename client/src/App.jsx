import { useState, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";
import Hero from "./components/sections/Hero";
import Stats from "./components/sections/Stats";
import CaseStudies from "./components/sections/CaseStudies";
import Capabilities from "./components/sections/Capabilities";
import Journal from "./components/sections/Journal";
import Testimonials from "./components/sections/Testimonials";
import FAQ from "./components/sections/FAQ";
import ContactCTA from "./components/sections/ContactCTA";
import Footer from "./components/Footer";

import "./styles/hero.css";
import "./styles/stats.css";
import "./styles/caseStudy.css";
import "./styles/capabilities.css";
import "./styles/journal.css";
import "./styles/testimonials.css";
import "./styles/faq.css";
import "./styles/contactCTA.css";
import "./styles/footer.css";
import "./styles/navbar.css";
import "./styles/noise.css";

import { ScrollTrigger } from "./lib/gsap.config";

function App() {
  const [isPreloading, setIsPreloading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsPreloading(false);
    // Refresh ScrollTrigger after DOM has fully rendered and settled
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  return (
    <>
      <div className="film-grain" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      {isPreloading && <Preloader onComplete={handlePreloaderComplete} />}

      <main
        style={{
          opacity: isPreloading ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
      >
        <Hero isReady={!isPreloading} />
        <Stats />
        <CaseStudies />
        <Capabilities />
        <Journal />
        <Testimonials />
        <FAQ />
        <ContactCTA />
        <Footer />
      </main>
    </>
  );
}

export default App;
