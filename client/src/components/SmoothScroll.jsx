import { useEffect } from 'react';
import Lenis from 'lenis';
import { useRef } from 'react';
import { LenisContext } from '../context/LenisContext';

// Import GSAP bridge — ScrollTrigger gets notified on every Lenis scroll tick
import { gsap, ScrollTrigger } from '../lib/gsap.config';

/**
 * SmoothScroll — wraps the entire app.
 *
 * Bridges Lenis ↔ GSAP ticker so ScrollTrigger progress stays perfectly
 * in sync with Lenis virtual scroll position.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // ── Bridge: Lenis scroll → ScrollTrigger.update ──────────
    lenis.on('scroll', ScrollTrigger.update);

    // ── Bridge: Use GSAP ticker instead of manual RAF ─────────
    // This keeps GSAP and Lenis on the same animation frame.
    function onTick(time) {
      lenis.raf(time * 1000); // GSAP time is in seconds → Lenis wants ms
    }
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0); // Prevent GSAP from compensating for lag

    // ── Anchor click interception ─────────────────────────────
    function handleAnchorClick(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor || !lenis) return;
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, {
        offset: -64,
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
    document.addEventListener('click', handleAnchorClick);

    return () => {
      gsap.ticker.remove(onTick);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}
