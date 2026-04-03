import { useRef, lazy, Suspense } from "react";
import { useGSAP } from "../../hooks/useGSAP";
import { gsap, ScrollTrigger } from "../../lib/gsap.config";

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
  { name: "JavaScript", pct: 95 },
  { name: "Node.js", pct: 92 },
  { name: "Express.js", pct: 88 },
  { name: "MySQL", pct: 82 },
  { name: "MongoDB", pct: 76 },
];

const TIMELINE = [
  {
    year: "2022 – Now",
    role: "Senior SDE",
    company: "Amazon",
    detail:
      "AWS S3 Core Infrastructure — reduced P99 latency from 240ms → 38ms.",
    color: "#6C63FF",
  },
  {
    year: "2020 – 2022",
    role: "SDE II",
    company: "Flipkart",
    detail:
      "Built real-time fraud detection pipeline · 1M+ transactions / day.",
    color: "#00D9FF",
  },
  {
    year: "2018 – 2020",
    role: "SDE I",
    company: "Razorpay",
    detail: "Core API team · webhook delivery system · 99.99 % reliability.",
    color: "#918fa1",
  },
];

/* ─────────────────────────────────────────────────────────────
   Skill Bar — individual animated bar
───────────────────────────────────────────────────────────────*/
function SkillBar({ name, pct, index }) {
  const barRef = useRef(null);

  // Animate on scroll using ScrollTrigger.create
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
   Timeline Entry
───────────────────────────────────────────────────────────────*/
function TimelineEntry({ entry, index }) {
  const ref = useRef(null);

  useGSAP(
    (ctx) => {
      ctx.add(() => {
        gsap.from(ref.current, {
          x: -32,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          delay: index * 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    ref,
    [],
  );

  return (
    <div ref={ref} className="timeline-entry">
      {/* Vertical connector dot */}
      <div
        className="timeline-entry__dot"
        style={{ background: entry.color }}
      />

      <div className="timeline-entry__body">
        <p className="timeline-entry__year" style={{ color: entry.color }}>
          {entry.year}
        </p>
        <h4 className="timeline-entry__role">
          {entry.role}
          <span className="timeline-entry__company"> · {entry.company}</span>
        </h4>
        <p className="timeline-entry__detail">{entry.detail}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   About — main exported section
───────────────────────────────────────────────────────────────*/
export default function About() {
  const isDesktop =
    typeof window !== "undefined" ? window.innerWidth > 768 : true;
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bioRef = useRef(null);
  const statsRef = useRef(null);
  const skillsRef = useRef(null);
  const timelineRef = useRef(null);

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

        // Heading — split into lines via wrapping
        gsap.from(headingRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        });

        // Bio paragraph — character-theatrical entrance
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

        // Timeline heading
        gsap.from(".about-timeline__title", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: timelineRef.current, start: "top 88%" },
        });

        // Timeline line draw
        gsap.from(".timeline-line", {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: timelineRef.current, start: "top 80%" },
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
          Crafting exceptional digital
          <br />
          experiences for over 6 years.
        </h2>

        {/* ── Two-column: Bio + 3D Model ─────────────────*/}
        <div className="about-top">
          {/* Left — Bio */}
          <div ref={bioRef} className="about-bio">
            <p className="about-bio__line">
              I'm a Senior Full‑Stack Engineer with deep expertise in scalable
              distributed systems, cloud infrastructure, and high‑performance
              web applications.
            </p>
            <p className="about-bio__line">
              I've shipped products used by{" "}
              <strong>millions of users across 40+ countries</strong> and
              consistently optimised critical paths that directly impacted
              revenue and reliability.
            </p>
            <p className="about-bio__line">
              Currently building next‑generation developer tooling at Amazon,
              with a focus on S3 core infrastructure and distributed metadata
              services.
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
          <h3 className="about-skills__title">Core Expertise</h3>
          <div className="about-skills__grid">
            {SKILLS.map((s, i) => (
              <SkillBar key={s.name} {...s} index={i} />
            ))}
          </div>
        </div>

        {/* ── Timeline ──────────────────────────────────── */}
        <div ref={timelineRef} className="about-timeline">
          <h3 className="about-timeline__title">Career Journey</h3>

          <div className="timeline">
            <div className="timeline-line" aria-hidden="true" />
            {TIMELINE.map((entry, i) => (
              <TimelineEntry key={entry.company} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
