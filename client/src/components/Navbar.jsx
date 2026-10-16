import { useState, useEffect, useRef } from "react";
import { gsap } from "../lib/gsap.config";
import { useGSAP } from "../hooks/useGSAP";
import "../styles/navbar.css";

const NAV_ITEMS = [
  { num: "01", label: "Home", href: "#home" },
  { num: "02", label: "Stats", href: "#stats" },
  { num: "03", label: "Case Study", href: "#case-study" },
  { num: "04", label: "Capabilities", href: "#capabilities" },
  { num: "05", label: "Journal", href: "#journal" },
  { num: "06", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const navContainerRef = useRef(null);
  const itemRefs = useRef([]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Entrance animation
  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
    },
    [],
    navRef
  );

  // High-performance scroll listener (zero re-renders when state hasn't changed)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPast = window.scrollY > 40;
          setScrolled((prev) => (prev !== isPast ? isPast : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section highlight listener
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px" }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Calculate sliding pill position only when target index actually changes
  const activeIdx = NAV_ITEMS.findIndex((item) => item.href === activeSection);
  const targetIdx = hoveredIdx !== null ? hoveredIdx : (activeIdx !== -1 ? activeIdx : 0);

  useEffect(() => {
    const targetEl = itemRefs.current[targetIdx];
    if (targetEl && navContainerRef.current) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      setIndicatorStyle({
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    }
  }, [targetIdx]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        ref={navRef}
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        aria-label="Main Navigation"
      >
        <div className="container navbar-inner">
          {/* Left: Refined Monogram Logo */}
          <div className="navbar-left">
            <a href="#home" className="navbar-logo" aria-label="Venis Bhalara Home">
              <span className="navbar-logo-text">VB</span>
              <span className="navbar-logo-dot" aria-hidden="true" />
            </a>
          </div>

          {/* Center: Precision Architectural Frosted Glass Capsule */}
          <nav
            ref={navContainerRef}
            className="navbar-center"
            aria-label="Primary Navigation"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Sliding Magnetic Pill Indicator */}
            <div
              className="nav-sliding-pill"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
              aria-hidden="true"
            />

            <ul className="navbar-nav-list">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.href;
                const isHovered = hoveredIdx === idx;
                const isHighlighted = isHovered || (hoveredIdx === null && isActive);

                return (
                  <li key={item.href} className="navbar-nav-item">
                    <a
                      ref={(el) => (itemRefs.current[idx] = el)}
                      href={item.href}
                      className={`navbar-link ${isHighlighted ? "is-highlighted" : ""} ${isActive ? "is-active" : ""}`}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onClick={() => setActiveSection(item.href)}
                    >
                      <span className="nav-link__num">{item.num}</span>
                      <span className="nav-link__text">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Signature Antony Book a Call CTA & Mobile Toggle */}
          <div className="navbar-right">
            <a href="#contact" className="navbar-btn-call">
              <span className="navbar-btn-call__label">Book a Call</span>
              <span className="navbar-btn-call__arrow" aria-hidden="true">↗</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`menu-toggle ${menuOpen ? "menu-toggle--open" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle Navigation Menu"
              aria-expanded={menuOpen}
            >
              <div className="menu-toggle-icon">
                <span />
                <span />
                <span />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <nav
        className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="mobile-nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`mobile-nav-link ${activeSection === item.href ? "active" : ""}`}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div>
          <a href="#contact" className="btn-primary" onClick={closeMenu} style={{ width: "100%" }}>
            Book a Call
          </a>
        </div>
      </nav>
    </>
  );
}
