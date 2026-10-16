import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { useGSAP } from "../../hooks/useGSAP";
import { gsap } from "../../lib/gsap.config";

const RotatingModel = lazy(() => import("../three/RotatingModel"));

/* ─────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────────*/
const STATS = [
  { value: "6+", label: "Years Experience" },
  { value: "50+", label: "Projects Shipped" },
  { value: "100k+", label: "Users Served" },
  { value: "99.9%", label: "Uptime SLA" },
];

const SKILLS = [
  { name: "Node.js & TypeScript", pct: 94 },
  { name: "Distributed Systems & Go", pct: 90 },
  { name: "Cloud Infrastructure (AWS & Docker)", pct: 88 },
  { name: "SQL & NoSQL (MySQL, DynamoDB)", pct: 86 },
  { name: "High-Throughput APIs & Event Streams", pct: 92 },
];

/* ─────────────────────────────────────────────────────────────
   Skill Bar — individual animated bar
───────────────────────────────────────────────────────────────*/
function SkillBar({ name, pct, index }) {
  const barRef = useRef(null);

  useGSAP(
    (ctx) => {
      ctx.add(() => {
        gsap.from(barRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power3.out",
          delay: index * 0.08,
          scrollTrigger: {
            trigger: barRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    barRef,
    [],
  );

  return (
    <div className="about-skill">
      <div className="about-skill__header">
        <span className="about-skill__name">{name}</span>
        <span className="about-skill__pct">{pct}%</span>
      </div>
      <div className="about-skill__track" aria-hidden="true">
        <div
          ref={barRef}
          className="about-skill__fill"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   About — main exported section
───────────────────────────────────────────────────────────────*/
export default function About() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth > 768 : true,
  );

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bioRef = useRef(null);
  const statsRef = useRef(null);
  const skillsRef = useRef(null);

  /* ── Scroll-triggered text reveals ──────────────────────*/
  useGSAP(
    (ctx) => {
      ctx.add(() => {
        // Section label + heading
        gsap.from(".about-label", {
          y: 16,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-label", start: "top 88%" },
        });

        // Heading
        gsap.from(headingRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        });

        // Bio paragraphs
        gsap.from(".about-bio__line", {
          y: 22,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: bioRef.current, start: "top 85%" },
        });

        // Stats counter effect
        gsap.from(".about-stat", {
          y: 20,
          opacity: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: statsRef.current, start: "top 88%" },
        });

        // Skills section heading
        gsap.from(".about-skills__title", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: skillsRef.current, start: "top 88%" },
        });
      });
    },
    sectionRef,
    [],
  );

  return (
    <section ref={sectionRef} className="about" id="about" aria-label="About">
      <div className="container">
        {/* ── Header ────────────────────────────────────── */}
        <p className="about-label section-label">About Me</p>
        <h2 ref={headingRef} className="about-heading">
          Engineering scalable, resilient
          <br />
          systems for high-load platforms.
        </h2>

        {/* ── Two-column: Bio + 3D Model ─────────────────*/}
        <div className="about-top">
          {/* Left — Bio */}
          <div ref={bioRef} className="about-bio">
            <p className="about-bio__line">
              I'm a Senior Backend &amp; Full‑Stack Engineer specialized in
              architecting scalable distributed systems, cloud infrastructure,
              and high‑performance web services.
            </p>
            <p className="about-bio__line">
              Over the past 6+ years, I've designed architectures supporting{" "}
              <strong>millions of users across global regions</strong>,
              consistently optimizing critical paths to reduce P99 latencies,
              prevent cascading service failures, and guarantee 99.9% uptime.
            </p>
            <p className="about-bio__line">
              My engineering philosophy focuses on clean domain boundaries,
              event-driven streaming pipelines, robust database indexing, and
              observable cloud systems with automated recovery.
            </p>

            {/* Stats */}
            <div ref={statsRef} className="about-stats">
              {STATS.map(({ value, label }) => (
                <div key={label} className="about-stat">
                  <span className="about-stat__value">{value}</span>
                  <span className="about-stat__label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 3D model */}
          <div className="about-model-wrap">
            {isDesktop ? (
              <Suspense fallback={<div className="about-model-placeholder" />}>
                <RotatingModel />
              </Suspense>
            ) : (
              <div
                className="about-model-placeholder"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
        </div>

        {/* ── Skills ────────────────────────────────────── */}
        <div ref={skillsRef} className="about-skills">
          <h3 className="about-skills__title">Core Technical Competencies</h3>
          <div className="about-skills__grid">
            {SKILLS.map((s, i) => (
              <SkillBar key={s.name} {...s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
