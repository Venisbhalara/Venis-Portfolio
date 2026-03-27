import { useRef } from 'react';
import { useGSAP, useScrollTriggerAnimation, useTextReveal } from '../hooks/useGSAP';
import { gsap } from '../lib/gsap.config';

/**
 * GSAPDemo — showcases all animation hooks in a self-contained section.
 *
 * Drop anywhere in App.jsx to test:
 *   import GSAPDemo from './components/GSAPDemo';
 *   <GSAPDemo />
 */
export default function GSAPDemo() {
  const containerRef = useRef(null);
  const titleRef = useTextReveal(); // word-split headline
  const barRef = useRef(null);

  // ── 1. useGSAP context: staggered cards ───────────────────
  useGSAP((ctx) => {
    ctx.add(() => {
      gsap.from('.demo-card', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.demo-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, containerRef, []);

  // ── 2. useScrollTriggerAnimation: skill bars ──────────────
  useScrollTriggerAnimation({
    selector: null,    // we'll animate the bar ref directly
    scope: barRef,
    fromVars: { scaleX: 0, transformOrigin: 'left center' },
    toVars: { scaleX: 1, duration: 1.2, ease: 'power3.out' },
    trigger: { start: 'top 80%' },
  });

  return (
    <section
      ref={containerRef}
      style={{
        background: '#131313',
        padding: '120px 40px',
        maxWidth: '900px',
        margin: '0 auto',
        fontFamily: 'Inter, sans-serif',
        color: '#e5e2e1',
      }}
    >
      {/* ── Text Reveal Demo ─────────────────────────────── */}
      <p style={{ fontSize: 11, letterSpacing: '0.12em', color: '#6C63FF', textTransform: 'uppercase', marginBottom: 16 }}>
        GSAP DEMO
      </p>

      <h2
        ref={titleRef}
        style={{ fontSize: 52, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24, lineHeight: 1.1 }}
      >
        Animations that feel right.
      </h2>

      <p style={{ fontSize: 16, color: '#c7c4d8', maxWidth: 520, lineHeight: 1.7, marginBottom: 64 }}>
        Scroll to reveal. Each element enters exactly when it should — no lag, no jitter.
        Powered by GSAP ScrollTrigger, driven by Lenis.
      </p>

      {/* ── Staggered Cards Demo ─────────────────────────── */}
      <div
        className="demo-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 64 }}
      >
        {[
          { label: 'FRONTEND', value: 'React · TypeScript · Vite' },
          { label: 'BACKEND', value: 'Node.js · Express · MySQL' },
          { label: 'CLOUD', value: 'AWS · Docker · Kubernetes' },
        ].map((item) => (
          <div
            key={item.label}
            className="demo-card"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: '28px 24px',
            }}
          >
            <p style={{ fontSize: 10, color: '#6C63FF', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
              {item.label}
            </p>
            <p style={{ fontSize: 14, color: '#c7c4d8' }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* ── Skill Bar Demo (scaleX) ──────────────────────── */}
      <div ref={barRef} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { skill: 'Node.js', level: '95%' },
          { skill: 'React', level: '92%' },
          { skill: 'AWS', level: '80%' },
          { skill: 'TypeScript', level: '88%' },
        ].map((item) => (
          <div key={item.skill}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: '#c7c4d8' }}>{item.skill}</span>
              <span style={{ fontSize: 13, color: '#6C63FF' }}>{item.level}</span>
            </div>
            <div style={{ height: 3, background: '#2a2a2a', borderRadius: 99 }}>
              <div
                style={{
                  height: '100%',
                  width: item.level,
                  background: 'linear-gradient(90deg, #6C63FF, #00D9FF)',
                  borderRadius: 99,
                  transformOrigin: 'left center',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
