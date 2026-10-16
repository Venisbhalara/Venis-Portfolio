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
    // Ultra-smooth, responsive Lenis configuration (zero input lag, buttery 60-120fps)
    const lenis = new Lenis({
      duration: 0.85, // Snappy & responsive (avoids sluggish momentum delay)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // ── Bridge: Lenis scroll → ScrollTrigger.update ──────────
    lenis.on('scroll', ScrollTrigger.update);

    // ── Bridge: GSAP ticker drives Lenis RAF in perfect lockstep ──
    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);

    // Allow GSAP to gracefully absorb minor frame hiccups without stutter
    gsap.ticker.lagSmoothing(500, 33);

    // ── Anchor click interception ─────────────────────────────
    function handleAnchorClick(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor || !lenis) return;
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, {
        offset: -64,
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
    document.addEventListener('click', handleAnchorClick, { passive: false });

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
