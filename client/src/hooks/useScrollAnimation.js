import { useEffect, useRef } from 'react';

/**
 * useScrollAnimation — lightweight scroll-triggered reveal hook.
 *
 * Uses IntersectionObserver (no GSAP dependency required).
 * When the target element enters the viewport it adds the
 * 'is-visible' CSS class, triggering your CSS transition.
 *
 * @param {object} options
 * @param {number} options.threshold  - 0–1, how much of the element must be visible (default 0.15)
 * @param {string} options.rootMargin - IntersectionObserver rootMargin (default '0px')
 * @param {boolean} options.once     - only trigger once (default true)
 *
 * @returns {React.RefObject} — attach to the element you want to animate
 *
 * Usage:
 *   const ref = useScrollAnimation();
 *   <section ref={ref} className="fade-up"> ... </section>
 *
 * CSS required:
 *   .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
 *   .fade-up.is-visible { opacity: 1; transform: translateY(0); }
 */
export function useScrollAnimation({ threshold = 0.15, rootMargin = '0px', once = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove('is-visible');
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

/**
 * useScrollProgress — tracks Lenis scroll progress (0–1) for parallax
 * or progress-bar effects. Requires Lenis to be running.
 *
 * @param {React.RefObject} lenisRef - from useLenisContext()
 * @param {function} onScroll       - callback(progress, velocity)
 *
 * Usage:
 *   const lenis = useLenisContext();
 *   useScrollProgress(lenis, (progress) => {
 *     gsap.set('.parallax', { y: progress * -60 });
 *   });
 */
export function useScrollProgress(lenisRef, onScroll) {
  useEffect(() => {
    const lenis = lenisRef?.current;
    if (!lenis) return;

    function handler({ scroll, limit, velocity }) {
      const progress = Math.min(scroll / limit, 1);
      onScroll(progress, velocity);
    }

    lenis.on('scroll', handler);
    return () => lenis.off('scroll', handler);
  }, [lenisRef, onScroll]);
}
