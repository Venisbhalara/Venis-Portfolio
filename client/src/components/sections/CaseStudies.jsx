import { useState, useRef } from "react";
import { gsap } from "../../lib/gsap.config";
import { useGSAP } from "../../hooks/useGSAP";
import projectLatency from "../../assets/theme/project-latency.jpg";
import projectFraud from "../../assets/theme/project-fraud.jpg";
import projectWebhook from "../../assets/theme/project-webhook.jpg";
import "../../styles/caseStudy.css";

const CASE_STUDIES = [
  {
    id: 1,
    title: "AWS S3 Metadata Scaling Engine",
    tags: ["// UX Research", "// Distributed Systems", "// P99 Optimization"],
    image: projectLatency,
    alt: "AWS S3 Metadata latency reduction dashboard",
    description:
      "Re-architected the S3 metadata caching and distribution tier to eliminate critical P99 latency spikes during global traffic surges. Replaced synchronous metadata lookups with an asynchronous, event-driven streaming pipeline using sharded DynamoDB partitions and Redis Streams.",
    metrics: "P99 latency dropped from 240ms to 38ms (84% reduction). Zero SLA breaches over 18 consecutive months.",
    stack: "Go, Redis Streams, DynamoDB, AWS Lambda, Prometheus",
    liveUrl: "https://aws.amazon.com/s3/",
    repoUrl: "https://github.com/Venisbhalara",
  },
  {
    id: 2,
    title: "Real-Time Fraud Detection Pipeline",
    tags: ["// Kafka Streams", "// ML Inference", "// Sub-100ms SLA"],
    image: projectFraud,
    alt: "Real-time fraud scoring pipeline console",
    description:
      "Designed a sub-100ms streaming machine learning scoring pipeline processing over 1M+ daily financial transactions with 99.8% precision. Engineered Kafka stream consumers with automated backpressure and gRPC microservice scoring models.",
    metrics: "False-positive order blocks reduced by 73%. Sustained 12,000+ events/sec throughput with p95 under 80ms.",
    stack: "Apache Kafka, Spark Streaming, Python, gRPC, PostgreSQL, Docker",
    liveUrl: "https://www.flipkart.com/",
    repoUrl: "https://github.com/Venisbhalara",
  },
  {
    id: 3,
    title: "High-Throughput Webhook Delivery Engine",
    tags: ["// Fault Tolerance", "// 99.99% Reliability", "// BullMQ Queues"],
    image: projectWebhook,
    alt: "Fault-tolerant webhook delivery engine console",
    description:
      "Architected a distributed webhook dispatching system delivering transactional and payment events to over 800+ enterprise merchant endpoints. Implemented exponential backoff with dead-letter queues and circuit breakers to avoid thundering-herd cascades.",
    metrics: "Achieved 99.99% delivery reliability with sub-50ms dispatch latency. Handled 400% Black Friday surges without dropped packets.",
    stack: "Node.js, MySQL, Redis, BullMQ, Docker, Nginx",
    liveUrl: "https://razorpay.com/",
    repoUrl: "https://github.com/Venisbhalara",
  },
];

export default function CaseStudies() {
  const [expandedId, setExpandedId] = useState(1);
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".case-study-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
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

  const toggleItem = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      className="case-study-section"
      id="case-study"
      aria-label="Case Studies"
    >
      <div className="container">
        {/* Section Header */}
        <div className="theme-section-header">
          <div className="theme-section-header__left">
            <div className="theme-section-header__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h2 className="theme-section-header__title white">Case Study</h2>
          </div>
          <p className="theme-section-header__desc white">
            In-depth looks at how design decisions solved real business challenges.
          </p>
        </div>

        {/* Case Studies List */}
        <div className="case-study-list">
          {CASE_STUDIES.map((cs) => {
            const isExpanded = expandedId === cs.id;

            return (
              <div
                key={cs.id}
                className={`case-study-item ${isExpanded ? "is-expanded" : ""}`}
              >
                {/* Trigger Button */}
                <button
                  className="case-study-trigger"
                  onClick={() => toggleItem(cs.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`case-drawer-${cs.id}`}
                >
                  <h3 className="case-study-title">{cs.title}</h3>
                  <div className="case-study-tags">
                    {cs.tags.map((tag) => (
                      <span key={tag} className="case-study-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>

                {/* Expandable Details Drawer */}
                <div
                  id={`case-drawer-${cs.id}`}
                  className="case-study-drawer"
                  aria-hidden={!isExpanded}
                >
                  <div className="case-study-card">
                    <div className="case-study-card__grid">
                      {/* Image Preview */}
                      <div className="case-study-card__preview">
                        <img src={cs.image} alt={cs.alt} loading="lazy" decoding="async" />
                      </div>

                      {/* Description & Impact */}
                      <div className="case-study-card__info">
                        <p className="case-study-card__desc">{cs.description}</p>

                        <div className="case-study-card__meta">
                          <div className="case-study-card__meta-item">
                            <span className="case-study-card__meta-label">IMPACT //</span>
                            <span className="case-study-card__meta-value">{cs.metrics}</span>
                          </div>
                          <div className="case-study-card__meta-item">
                            <span className="case-study-card__meta-label">STACK //</span>
                            <span className="case-study-card__meta-value">{cs.stack}</span>
                          </div>
                        </div>

                        <div className="case-study-card__actions">
                          <a
                            href={cs.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                          >
                            <span>Live Product</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                          <a
                            href={cs.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                            style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.2)" }}
                          >
                            <span>GitHub Source</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
