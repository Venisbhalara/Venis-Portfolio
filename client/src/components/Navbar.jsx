import { useState, useEffect, useRef } from "react";
import { gsap } from "../lib/gsap.config";
import { useGSAP } from "../hooks/useGSAP";
import "../styles/navbar.css";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  // GSAP entrance animation (slide down)
  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5, // wait for preloader a bit
      });
    },
    [],
    navRef,
  );

  // Monitor Scroll for glass effect — RAF-throttled so it never blocks scroll
  useEffect(() => {
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        rafId = null;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Monitor Active Section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the overlapping section
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    // Observe all sections matching nav item hrefs
    NAV_ITEMS.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handle mobile menu GSAP animation
  useEffect(() => {
    if (menuOpen) {
      // Open animation
      gsap.to(mobileMenuRef.current, {
        autoAlpha: 1, // handles visibility/opacity
        duration: 0.4,
        ease: "power2.out",
      });
      // Stagger links in
      gsap.fromTo(
        ".mobile-nav-link",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.2,
        },
      );
      document.body.style.overflow = "hidden"; // prevent scroll
    } else {
      // Close animation
      gsap.to(mobileMenuRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

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
          {/* Logo */}
          <a href="#home" className="navbar-logo" aria-label="Home">
            VB<span>.</span>
          </a>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`navbar-link ${activeSection === href ? "active" : ""}`}
                  onClick={() => setActiveSection(href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger Button */}
          <button
            className={`menu-toggle ${menuOpen ? "menu-toggle--open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle Navigation Menu"
            aria-expanded={menuOpen}
          >
            <div className="menu-toggle-icon" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <nav ref={mobileMenuRef} className="mobile-menu" aria-hidden={!menuOpen}>
        <ul className="mobile-nav-links">
          {NAV_ITEMS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={`mobile-nav-link ${activeSection === href ? "active" : ""}`}
                onClick={closeMenu}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
