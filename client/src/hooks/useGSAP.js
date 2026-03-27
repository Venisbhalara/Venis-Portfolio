import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap.config';

/**
 * useGSAP — a safe React wrapper around GSAP animations.
 *
 * Handles cleanup automatically: kills all animations and ScrollTrigger
 * instances created inside the callback on component unmount.
 *
 * @param {function} animationFn - (ctx) => { your gsap code here }
 * @param {Array}    deps        - dependency array (like useEffect)
 *
 * Usage:
 *   const containerRef = useRef(null);
 *   useGSAP((ctx) => {
 *     ctx.add(() => {
 *       gsap.from('.hero-title', { y: 60, opacity: 0, duration: 1 });
 *     });
 *   }, containerRef, []);
 */
export function useGSAP(animationFn, scopeRef, deps = []) {
  useEffect(() => {
    const ctx = gsap.context(animationFn, scopeRef?.current);
    return () => ctx.revert(); // cleanup all animations in this context
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * useScrollTriggerAnimation — scroll-triggered fade/slide reveal.
 *
 * @param {object} config
 * @param {string} config.selector   - CSS selector for targets (scope: containerRef)
 * @param {object} config.fromVars   - gsap.from() vars
 * @param {object} config.toVars     - gsap.to() vars (optional, use from OR fromTo)
 * @param {object} config.trigger    - ScrollTrigger config overrides
 * @param {React.RefObject} config.scope - container ref for scoping
 * @param {Array}  deps              - dependency array
 *
 * Usage:
 *   const ref = useRef(null);
 *   useScrollTriggerAnimation({
 *     selector: '.card',
 *     fromVars: { y: 40, opacity: 0 },
 *     scope: ref,
 *   });
 *   return <div ref={ref}><div className="card">...</div></div>;
 */
export function useScrollTriggerAnimation({
  selector,
  fromVars = { y: 40, opacity: 0 },
  toVars,
  trigger = {},
  scope,
  stagger = 0,
  deps = [],
}) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = selector
        ? gsap.utils.toArray(selector)
        : [scope?.current];

      targets.forEach((el, i) => {
        const defaultTrigger = {
          trigger: el,
          start: 'top 88%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
          ...trigger,
        };

        const vars = {
          ...fromVars,
          scrollTrigger: defaultTrigger,
          delay: stagger ? i * stagger : 0,
        };

        if (toVars) {
          gsap.fromTo(el, fromVars, { ...toVars, scrollTrigger: defaultTrigger });
        } else {
          gsap.from(el, vars);
        }
      });
    }, scope?.current);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * useParallax — subtle Lenis-driven parallax on an element.
 *
 * @param {React.RefObject} elRef    - element to parallax
 * @param {number}          speed    - parallax intensity (default 0.15)
 *
 * Usage:
 *   const ref = useParallax(0.2);
 *   <div ref={ref}>background image</div>
 */
export function useParallax(speed = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        gsap.set(el, {
          y: self.progress * speed * -100,
          force3D: true,
        });
      },
    });

    return () => st.kill();
  }, [speed]);

  return ref;
}

/**
 * useTextReveal — splits a heading into words and animates them in.
 *
 * @param {React.RefObject} ref  - ref to the heading element
 * @param {object}          vars - gsap.from() overrides
 *
 * Usage:
 *   const titleRef = useTextReveal();
 *   <h1 ref={titleRef}>Hello World</h1>
 */
export function useTextReveal(vars = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Split into word spans
    const text = el.innerText;
    const words = text.split(' ');
    el.innerHTML = words
      .map((w) => `<span class="word-wrap" style="display:inline-block;overflow:hidden;"><span class="word" style="display:inline-block;">${w}</span></span>`)
      .join(' ');

    const wordEls = el.querySelectorAll('.word');

    const ctx = gsap.context(() => {
      gsap.from(wordEls, {
        y: '105%',
        opacity: 0,
        duration: 0.85,
        stagger: 0.07,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        ...vars,
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}
