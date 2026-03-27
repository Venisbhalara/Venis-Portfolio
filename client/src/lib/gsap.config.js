/**
 * gsap.config.js — central GSAP setup.
 *
 * Import this ONCE at the top of main.jsx (before anything else).
 * It registers all plugins and bridges Lenis ↔ ScrollTrigger.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// ── Register plugins ────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ── Global GSAP defaults ────────────────────────────────────
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
});

// ── ScrollTrigger defaults ──────────────────────────────────
ScrollTrigger.config({
  ignoreMobileResize: true, // prevents layout shift redraws on mobile
});

/**
 * connectLenisToScrollTrigger
 *
 * Call this inside useLenis (or SmoothScroll) AFTER Lenis is created.
 * It overrides ScrollTrigger's internal scroll position with Lenis's
 * so both systems stay in sync.
 *
 * @param {Lenis} lenis - the Lenis instance
 */
export function connectLenisToScrollTrigger(lenis) {
  lenis.on('scroll', ScrollTrigger.update);

  // Override the scroll function ScrollTrigger uses
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // GSAP time is in seconds, Lenis wants ms
  });

  // Prevent GSAP's own ticker from doubling the RAF
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };
