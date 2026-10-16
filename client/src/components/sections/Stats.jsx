import { useRef } from "react";
import { gsap } from "../../lib/gsap.config";
import { useGSAP } from "../../hooks/useGSAP";
import "../../styles/stats.css";

const CATEGORIES = [
  { text: "Distributed Systems", type: "black", rotate: -5 },
  { text: "Cloud & AWS", type: "outline", rotate: 8 },
  { text: "Kafka Streams", type: "orange", rotate: -3 },
  { text: "Go Microservices", type: "outline", rotate: 4 },
  { text: "High-Load APIs", type: "green", rotate: -7 },
  { text: "PostgreSQL & Redis", type: "black", rotate: 6 },
  { text: "Kubernetes", type: "outline", rotate: -2 },
];

export default function Stats() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".stat-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
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
    <section ref={sectionRef} className="stats-section" id="stats" aria-label="Statistics">
      <div className="container">
        {/* Section Header */}
        <div className="theme-section-header">
          <div className="theme-section-header__left">
            <div className="theme-section-header__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="2" y="2" width="20" height="20" rx="4" />
                <path d="M7 16h10M7 12h6M7 8h8" />
              </svg>
            </div>
            <h2 className="theme-section-header__title">Stats</h2>
          </div>
          <p className="theme-section-header__desc">
            A quick look at the measurable impact behind Venis's engineering journey.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="stats-grid">
          {/* Card 1: 80+ Successful Projects */}
          <div className="stat-card">
            <div className="stat-card__top">
              <div className="stat-card__number">80+</div>
              <div className="stat-card__label">Successful Projects</div>
            </div>

            <div className="stat-pills-cloud">
              {CATEGORIES.map((cat, i) => (
                <span
                  key={cat.text}
                  className={`stat-pill stat-pill--${cat.type}`}
                  style={{ transform: `rotate(${cat.rotate}deg)` }}
                >
                  {cat.text}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: 95% Client Satisfaction Rate (Dark Card) */}
          <div className="stat-card stat-card--dark">
            <div className="stat-card__top">
              <div className="stat-card__number">95%</div>
              <div className="stat-card__label">Client Satisfaction Rate</div>
            </div>

            <div className="stat-chat-box">
              <div className="stat-chat-bubble">
                <div className="stat-chat-header">
                  <div className="stat-chat-avatar">👨‍💻</div>
                  <div className="stat-chat-name">Engineering Director</div>
                </div>
                <p className="stat-chat-msg">
                  “Venis re-architected our core event streaming pipelines under immense load. Reduced our P99 latency by 84% with zero downtime.”
                </p>
                <div className="stat-chat-footer">
                  <span>✓ 5m ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: 06+ Years of Experience */}
          <div className="stat-card">
            <div className="stat-card__top">
              <div className="stat-card__number">06+</div>
              <div className="stat-card__label">Years of Experience</div>
            </div>

            <div className="stat-gauge-box">
              <svg className="stat-gauge-svg" viewBox="0 0 240 140">
                {/* Arc 1: Outer dashed guide */}
                <path
                  d="M 20 130 A 100 100 0 0 1 220 130"
                  fill="none"
                  stroke="rgba(13, 19, 13, 0.12)"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                />
                {/* Arc 2: Inner semi-circle */}
                <path
                  d="M 45 130 A 75 75 0 0 1 195 130"
                  fill="none"
                  stroke="rgba(13, 19, 13, 0.08)"
                  strokeWidth="1.5"
                />

                {/* Scale Markings */}
                <text x="25" y="138" fontSize="11" fill="#6B7268" textAnchor="middle" fontFamily="Space Mono">03</text>
                <text x="50" y="85" fontSize="11" fill="#6B7268" textAnchor="middle" fontFamily="Space Mono">04</text>
                <text x="85" y="48" fontSize="11" fill="#6B7268" textAnchor="middle" fontFamily="Space Mono">05</text>
                <text x="120" y="32" fontSize="12" fill="#E94722" fontWeight="bold" textAnchor="middle" fontFamily="Space Mono">06</text>
                <text x="155" y="48" fontSize="11" fill="#6B7268" textAnchor="middle" fontFamily="Space Mono">07</text>
                <text x="190" y="85" fontSize="11" fill="#6B7268" textAnchor="middle" fontFamily="Space Mono">08</text>
                <text x="215" y="138" fontSize="11" fill="#6B7268" textAnchor="middle" fontFamily="Space Mono">09</text>

                {/* Needle Indicator pointing directly to 06 */}
                <g className="stat-gauge-needle">
                  <line x1="120" y1="130" x2="120" y2="44" stroke="#E94722" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="120" cy="130" r="7" fill="#0D130D" />
                  <circle cx="120" cy="130" r="3.5" fill="#E94722" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
