import { useRef } from "react";
import { gsap } from "../../lib/gsap.config";
import { useGSAP } from "../../hooks/useGSAP";
import journal1 from "../../assets/theme/journal-1.jpg";
import journal2 from "../../assets/theme/journal-2.jpg";
import "../../styles/journal.css";

const ARTICLES = [
  {
    id: 1,
    tag: "// ARCHITECTURE & RESILIENCE",
    title: "Designing Beyond Aesthetics: How Latency Architecture Shapes User Trust",
    image: journal1,
    alt: "Abstract organic 3D sculpture representing computational complexity",
    link: "https://github.com/Venisbhalara",
  },
  {
    id: 2,
    tag: "// DISTRIBUTED SYSTEMS",
    title: "From Concept to Pixel: The Creative Journey Behind Resilient SaaS Event Pipelines",
    image: journal2,
    alt: "Hardware module with brushed aluminum dial and blue status LED",
    link: "https://github.com/Venisbhalara",
  },
];

export default function Journal() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".journal-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
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

  return (
    <section
      ref={sectionRef}
      className="journal-section"
      id="journal"
      aria-label="Journal & Insights"
    >
      <div className="container">
        {/* Section Header */}
        <div className="theme-section-header">
          <div className="theme-section-header__left">
            <div className="theme-section-header__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h2 className="theme-section-header__title">Journal</h2>
          </div>
          <p className="theme-section-header__desc">
            Thoughts, lessons, and behind-the-scenes insights from my design and engineering journey.
          </p>
        </div>

        {/* 2 Article Cards */}
        <div className="journal-grid">
          {ARTICLES.map((article) => (
            <a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="journal-card"
            >
              <div className="journal-img-box">
                <img
                  src={article.image}
                  alt={article.alt}
                  className="journal-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="journal-content">
                <span className="journal-meta">{article.tag}</span>
                <h3 className="journal-title">{article.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
