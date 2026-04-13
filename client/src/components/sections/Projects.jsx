wwimport { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from '../../lib/gsap.config';
import { useGSAP } from '../../hooks/useGSAP';

/* ─────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────*/
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/* ─────────────────────────────────────────────────────────────
   useTilt — 3D magnetic tilt on mouse-move (desktop only)
───────────────────────────────────────────────────────────────*/
function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth < 768) return;

    let rafId = null;
    let latestX = 0;
    let latestY = 0;

    const onMove = (e) => {
      latestX = e.clientX;
      latestY = e.clientY;

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = latestX - rect.left;
        const y = latestY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -7;   // max ±7deg
        const rotY = ((x - cx) / cx) * 9;    // max ±9deg
        const pctX = ((x / rect.width) * 100).toFixed(1);
        const pctY = ((y / rect.height) * 100).toFixed(1);

        gsap.to(el, {
          rotateX: rotX,
          rotateY: rotY,
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 900,
        });
        el.style.setProperty('--mx', `${pctX}%`);
        el.style.setProperty('--my', `${pctY}%`);
        rafId = null;
      });
    };

    const onLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      gsap.to(el, {
        rotateX: 0, rotateY: 0, scale: 1,
        duration: 0.55, ease: 'power3.out',
        transformPerspective: 900,
      });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref]);
}

/* ─────────────────────────────────────────────────────────────
   ProjectModal — animated overlay
───────────────────────────────────────────────────────────────*/
function ProjectModal({ project, onClose }) {
  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  // Open animation
  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => {
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(
        panelRef.current,
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out', delay: 0.05 }
      );
    });
    return () => ctx.revert();
  }, [project]);

  const handleClose = useCallback(() => {
    const ctx = gsap.context(() => {
      gsap.to(panelRef.current, { y: 24, opacity: 0, scale: 0.97, duration: 0.3, ease: 'power2.in' });
      gsap.to(backdropRef.current, {
        opacity: 0, duration: 0.3, delay: 0.1, ease: 'power2.in',
        onComplete: onClose,
      });
    });
    return () => ctx.revert();
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!project) return null;

  return (
    <div
      ref={backdropRef}
      className="modal-backdrop is-open"
      onClick={(e) => e.target === backdropRef.current && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div ref={panelRef} className="modal-panel">
        {/* Close */}
        <button className="modal-close" onClick={handleClose} aria-label="Close modal">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>

        {/* Category */}
        <p className="modal-category section-label">{project.category}</p>

        {/* Title */}
        <h2 id="modal-title" className="modal-title">{project.title}</h2>

        {/* Problem */}
        {project.problem && (
          <div className="modal-section">
            <p className="modal-section__label">The Problem</p>
            <p className="modal-section__text">{project.problem}</p>
          </div>
        )}

        {/* Solution */}
        {project.solution && (
          <div className="modal-section">
            <p className="modal-section__label">The Solution</p>
            <p className="modal-section__text">{project.solution}</p>
          </div>
        )}

        {/* Outcome */}
        {project.outcome && (
          <div className="modal-section modal-outcome">
            <p className="modal-section__label">Impact & Results</p>
            <p className="modal-section__text">{project.outcome}</p>
          </div>
        )}

        {/* Tech Stack */}
        {project.tech_stack?.length > 0 && (
          <div className="modal-section" style={{ marginTop: 28 }}>
            <p className="modal-section__label">Tech Stack</p>
            <div className="modal-stack">
              {project.tech_stack.map((t) => (
                <span key={t} className="modal-tag">{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="modal-links">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              View Live
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              GitHub
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.646 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ProjectCard
───────────────────────────────────────────────────────────────*/
function ProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null);
  useTilt(cardRef);

  return (
    <article
      ref={cardRef}
      className="project-card"
      onClick={() => onOpen(project)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(project)}
      tabIndex={0}
      role="button"
      aria-label={`View ${project.title} details`}
    >
      {/* Top row */}
      <div className="project-card__top">
        <span className="project-card__category">{project.category}</span>
        <span className="project-card__arrow" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </span>
      </div>

      {/* Title */}
      <h3 className="project-card__title">{project.title}</h3>

      {/* Description */}
      <p className="project-card__desc">{project.description}</p>

      {/* Tech stack */}
      <div className="project-card__stack">
        {(project.tech_stack || []).slice(0, 5).map((t) => (
          <span key={t} className="project-tag">{t}</span>
        ))}
        {(project.tech_stack || []).length > 5 && (
          <span className="project-tag">+{project.tech_stack.length - 5}</span>
        )}
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   Projects — main exported section
───────────────────────────────────────────────────────────────*/
export default function Projects() {
  const sectionRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'success'
  const [activeProject, setActiveProject] = useState(null);

  // Fetch from backend
  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((r) => {
        if (!r.ok) throw new Error('Network response was not ok');
        return r.json();
      })
      .then(({ data }) => {
        setProjects(data || []);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, []);

  // GSAP scroll-triggered entrance animations
  useGSAP((ctx) => {
    if (status !== 'success') return;
    ctx.add(() => {
      // Header
      gsap.from('.projects-header', {
        y: 32, opacity: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-header', start: 'top 88%' },
      });

      // Cards — staggered
      gsap.from('.project-card', {
        y: 60, opacity: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' },
      });
    });
  }, sectionRef, [status]);

  const handleOpen = useCallback((p) => setActiveProject(p), []);
  const handleClose = useCallback(() => setActiveProject(null), []);

  return (
    <section ref={sectionRef} className="projects" id="projects" aria-label="Projects">
      <div className="projects__glow" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <div className="projects-header">
          <p className="section-label">Selected Work</p>
          <h2 className="projects-heading">
            Systems built to<br /> scale and survive.
          </h2>
          <p className="projects-sub">
            Three case studies — each solving a high-impact problem at a scale most engineers never see.
          </p>
        </div>

        {/* States */}
        {status === 'loading' && (
          <div className="projects-loading" aria-live="polite">
            <div className="projects-spinner" aria-hidden="true" />
            <span>Loading projects…</span>
          </div>
        )}

        {status === 'error' && (
          <div className="projects-error" role="alert">
            <span>Unable to load projects. Please check your connection.</span>
          </div>
        )}

        {status === 'success' && (
          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={handleOpen} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={handleClose} />
      )}
    </section>
  );
}
