import { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';

import Preloader from './components/Preloader';
import Hero    from './components/sections/Hero';

// Lazy loaded for performance
const About = lazy(() => import('./components/sections/About'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Contact = lazy(() => import('./components/sections/Contact'));
import './styles/hero.css';
import './styles/about.css';
import './styles/projects.css';
import './styles/experience.css';
import './styles/contact.css';
import './styles/navbar.css';
import './styles/noise.css';

function App() {
  const [isPreloading, setIsPreloading] = useState(true);

  return (
    <>
      <div className="film-grain" aria-hidden="true" />

      <Navbar />
      {isPreloading && <Preloader onComplete={() => setIsPreloading(false)} />}
      
      <main style={{ opacity: isPreloading ? 0 : 1, transition: 'opacity 0.8s ease' }}>
        <Hero isReady={!isPreloading} />
        
        <Suspense fallback={<div className="section-placeholder" aria-hidden="true" />}>
          <About />
          <Projects />
          <Experience />
          <Contact />
        </Suspense>
      </main>
    </>
  );
}

export default App;
