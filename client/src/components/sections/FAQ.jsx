import { useState, useRef } from "react";
import { gsap } from "../../lib/gsap.config";
import { useGSAP } from "../../hooks/useGSAP";
import "../../styles/faq.css";

const FAQS = [
  {
    id: 1,
    q: "What's your typical architecture and engineering process?",
    a: "I follow an empirical, benchmark-driven engineering methodology: deep dive into current traffic metrics and bottlenecks, define strict latency SLA targets, draft comprehensive RFC architecture specifications, prototype core high-risk paths, and execute with zero-downtime canary rollouts.",
  },
  {
    id: 2,
    q: "How long does a typical system overhaul or project take?",
    a: "Core infrastructure refactors and high-throughput microservice pipelines typically span 4 to 8 weeks depending on integration complexity, schema migrations, and concurrency requirements.",
  },
  {
    id: 3,
    q: "Do you offer full-stack implementation or backend only?",
    a: "While my core specialization is in distributed backend systems (Go, Node.js, Kafka, Redis, AWS), I design and build end-to-end full-stack applications with high-fidelity React, TypeScript, and interactive real-time interfaces.",
  },
  {
    id: 4,
    q: "What tools and cloud stacks do you build with?",
    a: "My daily production toolkit includes Go, TypeScript, Node.js, AWS (S3, Lambda, ECS, RDS, CloudFront), Docker, Kubernetes, Apache Kafka, Redis, PostgreSQL, DynamoDB, Terraform, and Prometheus/Grafana.",
  },
  {
    id: 5,
    q: "Can you optimize our existing system instead of rebuilding from scratch?",
    a: "Yes. I frequently conduct architecture and database performance audits to identify query bottlenecks, connection pool saturation, cache misconfigurations, and thread contention, achieving significant P99 speedups without rewriting the entire codebase.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(1);
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".faq-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.75,
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

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={sectionRef} className="faq-section" id="faq" aria-label="Frequently Asked Questions">
      <div className="container">
        {/* Section Header */}
        <div className="theme-section-header">
          <div className="theme-section-header__left">
            <div className="theme-section-header__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h2 className="theme-section-header__title">FAQ</h2>
          </div>
          <p className="theme-section-header__desc">
            Answers to the most common questions about my design and engineering process.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-list">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div key={faq.id} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                <button
                  className="faq-trigger"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-drawer-${faq.id}`}
                >
                  <span className="faq-question">{faq.q}</span>
                  <span className="faq-toggle-state">
                    {isOpen ? "Collapse ↑" : "Expand ↓"}
                  </span>
                </button>

                <div
                  id={`faq-drawer-${faq.id}`}
                  className="faq-drawer"
                  aria-hidden={!isOpen}
                >
                  <p className="faq-answer">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
