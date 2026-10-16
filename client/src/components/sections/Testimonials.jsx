import { useState, useRef } from "react";
import { gsap } from "../../lib/gsap.config";
import { useGSAP } from "../../hooks/useGSAP";
import test1 from "../../assets/theme/testimonial-1.jpg";
import test2 from "../../assets/theme/testimonial-2.jpg";
import "../../styles/testimonials.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Daniel Carter",
    role: "Founder at Flowbit",
    image: test1,
    quote:
      "Venis transformed our high-traffic architecture from fragile monoliths into a rock-solid, distributed pipeline. His attention to operational reliability and latency benchmarks is unmatched.",
  },
  {
    id: 2,
    name: "Michael Reeves",
    role: "Product Manager at NexaLabs",
    image: test2,
    quote:
      "Venis brings deep architectural clarity and purpose to every engineering decision. His systems-first approach turned our high-load vision into an infrastructure that scales effortlessly under global demand.",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".testimonials-wrapper",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    sectionRef,
    []
  );

  const current = TESTIMONIALS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section
      ref={sectionRef}
      className="testimonials-section"
      id="testimonials"
      aria-label="Client Testimonials"
    >
      <div className="container">
        {/* Section Header */}
        <div className="theme-section-header">
          <div className="theme-section-header__left">
            <div className="theme-section-header__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h2 className="theme-section-header__title">Testimonials</h2>
          </div>
          <p className="theme-section-header__desc">
            Hear from those who’ve experienced Venis’s engineering expertise firsthand.
          </p>
        </div>

        {/* Testimonial Box */}
        <div className="testimonials-wrapper">
          <div className="testimonials-grid">
            {/* Left: Author line-art portraits */}
            <div className="testimonials-portraits">
              {TESTIMONIALS.map((t, idx) => (
                <div
                  key={t.id}
                  className={`testimonial-author-card ${idx === activeIndex ? "is-active" : ""}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <div className="testimonial-author-img-box">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="testimonial-author-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <h3 className="testimonial-author-name">{t.name}</h3>
                    <p className="testimonial-author-role">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Quote callout and next/prev */}
            <div className="testimonial-quote-box">
              <div className="testimonial-quote-mark">“</div>
              <p className="testimonial-quote-text">{current.quote}</p>

              <div className="testimonial-nav-controls">
                <button
                  className="testimonial-nav-arrow"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                >
                  ← Prev
                </button>
                <button
                  className="testimonial-nav-arrow"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
