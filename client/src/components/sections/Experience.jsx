import { useEffect, useState, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap.config';
import { useGSAP } from '../../hooks/useGSAP';
import '../../styles/experience.css';

const EXPERIENCES = [
  {
    id: 1,
    role: 'Senior Full-Stack Engineer',
    company: 'Amazon Web Services',
    duration: '2022 — Present',
    description: 'Core infrastructure team responsible for S3 metadata scaling and distributed systems architecture.',
    metrics: [
      'Engineered an async event pipeline reducing P99 read latency from 240ms to 38ms.',
      'Designed highly-available control planes managing 100K+ concurrent requests/sec.',
      'Spearheaded the migration of legacy synchronous APIs to Go-based microservices.'
    ],
    color: '#6C63FF'
  },
  {
    id: 2,
    role: 'Software Development Engineer II',
    company: 'Flipkart',
    duration: '2020 — 2022',
    description: 'Led the backend engineering for real-time fraud detection and order risk scoring.',
    metrics: [
      'Built a sub-100ms streaming ML pipeline using Kafka and Spark Structured Streaming.',
      'Reduced false-positive blocked orders by 73%, saving estimated $2M annually.',
      'Mentored 3 junior engineers and established internal CI/CD best practices.'
    ],
    color: '#00D9FF'
  },
  {
    id: 3,
    role: 'Software Development Engineer I',
    company: 'Razorpay',
    duration: '2018 — 2020',
    description: 'Core Payments API team focusing on webhook delivery and merchant integration resilience.',
    metrics: [
      'Designed a fault-tolerant webhook engine achieving 99.99% delivery reliability.',
      'Implemented an exact-once immutable event log using Redis and dead-letter queues.',
      'Scaled the notification infrastructure to handle Black Friday spikes of +400% traffic.'
    ],
    color: '#918fa1'
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [skills, setSkills] = useState([]);

  // Fetch verified skills from API
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/skills')
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setSkills(res.data);
      })
      .catch((err) => console.error('Failed to fetch skills:', err));
  }, []);

  // GSAP Animations
  useGSAP((ctx) => {
    ctx.add(() => {
      // 1. Title Entrance
      gsap.from('.experience-heading', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.experience-heading', start: 'top 85%' }
      });

      // 2. Skills Grid stagger
      gsap.from('.skill-tag', {
        scale: 0.8, opacity: 0, 
        duration: 0.5, stagger: 0.04, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 90%' }
      });

      // 3. Timeline SVG Drawing Effect
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength() || 1000;
        gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: 1, // Smoothly ties drawing to scroll position
          }
        });
      }

      // 4. Experience Cards slide in
      gsap.utils.toArray('.exp-item').forEach((item, i) => {
        gsap.from(item, {
          x: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: item, start: 'top 85%' }
        });
        
        // Pop the timeline dot slightly earlier
        const dot = item.querySelector('.exp-dot');
        gsap.from(dot, {
          scale: 0, duration: 0.5, ease: 'back.out(2)',
          scrollTrigger: { trigger: item, start: 'top 85%' }
        });
      });
    });
  }, containerRef, []);

  return (
    <section ref={containerRef} className="experience" id="experience" aria-label="Experience & Skills">
      <div className="container">
        <p className="section-label">My Career</p>
        <h2 className="experience-heading">
          Engineering scalable systems for global impact.
        </h2>

        {/* ── Skills Cloud ── */}
        <div className="experience-skills">
          <h3 className="skills-title">Core Technologies</h3>
          <div className="skills-grid">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <div key={skill.id} className="skill-tag">{skill.name}</div>
              ))
            ) : (
              // Fallback if API is slow/down
              ['Node.js', 'React', 'TypeScript', 'AWS', 'Kafka', 'Redis', 'MySQL'].map(s => (
                <div key={s} className="skill-tag">{s}</div>
              ))
            )}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="timeline-container">
          
          {/* Animated SVG Path Background */}
          <div className="timeline-svg-wrap" aria-hidden="true">
            <svg className="timeline-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6C63FF" stopOpacity="1" />
                  <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0e0e0e" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Background dashed path */}
              <line x1="50%" y1="0" x2="50%" y2="100%" className="timeline-path" />
              {/* Solid foreground path tracking scroll */}
              <line ref={pathRef} x1="50%" y1="0" x2="50%" y2="100%" className="timeline-path-active" />
            </svg>
          </div>

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="exp-item group">
              {/* Connector Dot */}
              <div className="exp-connector">
                <div className="exp-dot" style={{ borderColor: exp.color }} />
              </div>
              
              {/* Card Content */}
              <div className="exp-content">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <span className="exp-company">{exp.company}</span>
                  </div>
                  <div className="exp-duration">{exp.duration}</div>
                </div>
                
                <p className="exp-desc">{exp.description}</p>
                
                <ul className="exp-metrics">
                  {exp.metrics.map((metric, i) => (
                    <li key={i}>{metric}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
