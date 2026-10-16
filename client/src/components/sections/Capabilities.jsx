import { useRef } from "react";
import { gsap } from "../../lib/gsap.config";
import { useGSAP } from "../../hooks/useGSAP";
import capBackend from "../../assets/theme/cap-backend.jpg";
import capCloud from "../../assets/theme/cap-cloud.jpg";
import capFullstack from "../../assets/theme/cap-fullstack.jpg";
import "../../styles/capabilities.css";

const CAPABILITIES = [
  {
    id: 1,
    title: "Backend & Systems",
    desc: "Architecting high-throughput Go & Node.js microservices, low-latency gRPC APIs, and zero-loss event pipelines.",
    image: capBackend,
    alt: "Backend Systems Architecture with gRPC and Distributed Databases",
  },
  {
    id: 2,
    title: "Cloud & DevOps",
    desc: "Designing resilient AWS infrastructure, multi-region failover topologies, Kubernetes clusters, and automated CI/CD.",
    image: capCloud,
    alt: "Cloud Infrastructure and scale without limits",
  },
  {
    id: 3,
    title: "Full-Stack & Web Apps",
    desc: "Building mission-critical web applications with React, TypeScript, real-time WebSockets, and sub-second load times.",
    image: capFullstack,
    alt: "Full-Stack fintech mobile and web application interface",
  },
];

export default function Capabilities() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".capability-card-wrap",
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
    <section
      ref={sectionRef}
      className="capabilities-section"
      id="capabilities"
      aria-label="Capabilities"
    >
      <div className="container">
        {/* Section Header */}
        <div className="theme-section-header">
          <div className="theme-section-header__left">
            <div className="theme-section-header__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <h2 className="theme-section-header__title">Capabilities</h2>
          </div>
          <p className="theme-section-header__desc">
            Here’s how I help businesses bring their ideas to life through engineering.
          </p>
        </div>

        {/* 3 Capabilities Cards */}
        <div className="capabilities-grid">
          {CAPABILITIES.map((cap) => (
            <div key={cap.id} className="capability-card-wrap">
              <div className="capability-img-box">
                <img
                  src={cap.image}
                  alt={cap.alt}
                  className="capability-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="capability-info">
                <h3 className="capability-title">{cap.title}</h3>
                <p className="capability-desc">{cap.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
