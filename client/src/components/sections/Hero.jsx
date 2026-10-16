import { useState, useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap.config";
import { useGSAP } from "../../hooks/useGSAP";
import heroAvatar from "../../assets/theme/hero-avatar.jpg";
import ctaFoliage from "../../assets/theme/cta-foliage.jpg";
import projectLatency from "../../assets/theme/project-latency.jpg";
import projectFraud from "../../assets/theme/project-fraud.jpg";
import projectWebhook from "../../assets/theme/project-webhook.jpg";
import "../../styles/hero.css";

const SLIDES = [
  {
    id: 1,
    title: "SaaS / High-Throughput Infrastructure",
    subtitle: "Explore the Work",
    href: "#case-study",
    image: projectLatency,
    bg: "#0B1F14",
    alt: "AWS S3 Metadata Latency Reduction Dashboard",
  },
  {
    id: 2,
    title: "Streaming ML / Real-Time Fraud Engine",
    subtitle: "Explore the Work",
    href: "#case-study",
    image: projectFraud,
    bg: "#10141A",
    alt: "Real-Time Risk Scoring and Fraud Detection Console",
  },
  {
    id: 3,
    title: "Distributed Payments / Webhook Delivery",
    subtitle: "Explore the Work",
    href: "#case-study",
    image: projectWebhook,
    bg: "#0D131A",
    alt: "99.99% Reliability Webhook Delivery Pipeline",
  },
];

export default function Hero({ isReady = true }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef(null);
  const avatarRef = useRef(null);
  const titleRef = useRef(null);
  const bioRef = useRef(null);
  const showcaseRef = useRef(null);

  // GSAP entrance animation
  useGSAP(
    () => {
      if (!isReady) return;

      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(avatarRef.current, {
        scale: 0.8,
        opacity: 0,
        rotation: -14,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
        .from(
          titleRef.current?.children || [],
          {
            y: 35,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          bioRef.current,
          {
            x: 25,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          showcaseRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.4"
        );
    },
    [isReady],
    containerRef
  );

  // Auto-advance slides every 6 seconds (paused if tab is inactive)
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.hidden) return;
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[activeSlide];

  return (
    <section ref={containerRef} className="hero-section" id="home" aria-label="Hero">
      <div className="container">
        {/* ── Top Identity Section ────────────────────── */}
        <div className="hero-identity-wrap">
          <div className="hero-identity-grid">
            {/* Left: Avatar + "I'M VENIS" */}
            <div className="hero-identity-left">
              <div ref={avatarRef} className="hero-avatar-box">
                <img
                  src={heroAvatar}
                  alt="Venis Bhalara"
                  className="hero-avatar-img"
                  loading="eager"
                  decoding="async"
                  width="110"
                  height="110"
                />
              </div>

              <div ref={titleRef} className="hero-title-box">
                <span className="hero-subtitle">I’M</span>
                <h1 className="hero-title">VENIS</h1>
              </div>
            </div>

            {/* Right: Visionary Statement */}
            <div ref={bioRef} className="hero-identity-right">
              <p className="hero-bio-text">
                A Visionary Full-Stack &amp; Distributed Systems Architect Based in Honolulu / Global.
              </p>
            </div>
          </div>

          {/* Architectural divider lines */}
          <div className="hero-architectural-border" aria-hidden="true">
            <div className="border-line-dash" />
            <div className="border-line-solid-accent" />
            <div className="border-line-dash" />
          </div>
        </div>

        {/* ── Showcase Carousel Card ──────────────────── */}
        <div ref={showcaseRef} className="hero-showcase-wrapper">
          {/* Header row */}
          <div className="hero-showcase-header">
            <div className="hero-showcase-title-area">
              <h2 className="hero-showcase-title">{slide.title}</h2>
              <a href={slide.href} className="hero-showcase-explore">
                <span>{slide.subtitle}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            {/* Counter // 01 and bars */}
            <div className="hero-showcase-counter">
              <div className="hero-counter-num">
                <span>//</span> 0{slide.id}
              </div>
              <div className="hero-counter-bars">
                {SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    className={`hero-counter-bar ${idx === activeSlide ? "active" : ""}`}
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Go to slide ${s.id}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Display Stage with Dashboard & Foliage Backdrop */}
          <div className="hero-showcase-stage" style={{ backgroundColor: slide.bg }}>
            {/* Organic Autumn foliage border illumination */}
            <img
              src={ctaFoliage}
              alt=""
              className="hero-foliage-backdrop"
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />

            {/* Main Interactive Dashboard Preview */}
            <div className="hero-preview-frame">
              <img
                src={slide.image}
                alt={slide.alt}
                className="hero-preview-img"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Arrow Nav Buttons */}
            <button
              className="hero-stage-nav-btn prev"
              onClick={() => setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
              aria-label="Previous Showcase Item"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="hero-stage-nav-btn next"
              onClick={() => setActiveSlide((prev) => (prev + 1) % SLIDES.length)}
              aria-label="Next Showcase Item"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
