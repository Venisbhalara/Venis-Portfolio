import { useRef, useEffect, lazy, Suspense } from "react";
import { gsap } from "../../lib/gsap.config";
import { useTextReveal } from "../../hooks/useGSAP";

// Lazy load the heavy 3D canvas — keeps initial bundle small
const ParticleField = lazy(() => import("../three/ParticleField"));

/* ─────────────────────────────────────────────────────────────
   Availability Badge — the green "open to work" pill.
───────────────────────────────────────────────────────────────*/
function AvailabilityBadge() {
  return;
}

/* ─────────────────────────────────────────────────────────────
   Social Links row
───────────────────────────────────────────────────────────────*/
function SocialLinks() {
  const links = [
    {
      label: "GitHub",
      href: "https://github.com/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.646 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Twitter / X",
      href: "https://twitter.com/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="hero-social" role="list" aria-label="Social profiles">
      {links.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-social__link"
          aria-label={label}
          role="listitem"
        >
          {icon}
        </a>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Scroll indicator — animated arrow at bottom of hero.
───────────────────────────────────────────────────────────────*/
function ScrollIndicator() {
  return (
    <div className="hero-scroll" aria-hidden="true">
      <span className="hero-scroll__label"></span>
      {/* <div className="hero-scroll__line">
        <div className="hero-scroll__dot" />
      </div> */}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero — main exported section.
───────────────────────────────────────────────────────────────*/
export default function Hero({ isReady = true }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const subRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const titleRef = useTextReveal({ duration: 1, ease: "power4.out" });

  /* ── GSAP entrance: staggered from bottom ─────────────────*/
  useEffect(() => {
    if (!isReady) return; // Wait for preloader

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Badge
      tl.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      // Title handled by useTextReveal (words fly up after badge)
      // Sub-headline
      tl.from(
        subRef.current,
        {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.2",
      );

      // Tagline
      tl.from(
        taglineRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      );

      // CTAs
      tl.from(
        ctaRef.current,
        {
          y: 16,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.25",
      );

      // Socials
      tl.from(
        socialRef.current,
        {
          y: 12,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isReady]);

  /* ── Subtle mouse-parallax on the content ─────────────────*/
  useEffect(() => {
    const el = contentRef.current;
    if (!el || window.innerWidth < 768) return;

    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      gsap.to(el, { x, y, duration: 1.2, ease: "power1.out" });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section ref={sectionRef} className="hero" id="home" aria-label="Hero">
      {/* ── 3D Canvas Background ──────────────────────────── */}
      <div className="hero__canvas" aria-hidden="true">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </div>

      {/* ── Radial glow — accent colour bloom top-right ───── */}
      <div className="hero__glow" aria-hidden="true" />

      {/* ── Content ──────────────────────────────────────── */}
      <div className="container">
        <div ref={contentRef} className="hero__content">
          {/* Badge */}
          <div ref={badgeRef}>
            <AvailabilityBadge />
          </div>

          {/* Name */}
          <h1 ref={titleRef} className="hero__name">
            Venis Bhalara
          </h1>

          {/* Role */}
          <p ref={subRef} className="hero__role">
            Backend Developer
          </p>

          {/* Tagline */}
          <p ref={taglineRef} className="hero__tagline">
            Building scalable systems that handle{" "}
            <span className="hero__accent">100k+ users.</span> Former SDE at
            Amazon&nbsp;•&nbsp;AWS&nbsp;•&nbsp;Flipkart.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="hero__cta">
            <a href="#projects" className="btn btn--primary">
              Explore My Work
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn btn--ghost">
              Let's Talk
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              View My Resume
            </a>
          </div>

          {/* Social */}
          <div ref={socialRef}>
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <ScrollIndicator />
    </section>
  );
}
