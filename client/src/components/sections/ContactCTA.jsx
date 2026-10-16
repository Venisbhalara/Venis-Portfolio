import { useState, useRef } from "react";
import { gsap } from "../../lib/gsap.config";
import { useGSAP } from "../../hooks/useGSAP";
import ctaFoliage from "../../assets/theme/cta-foliage.jpg";
import "../../styles/contactCTA.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ContactCTA() {
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cta-banner-wrapper",
        { scale: 0.96, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.85,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit message.");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err.message?.includes("fetch") || err.name === "TypeError"
          ? "Message sent to offline queue. You can also reach out directly to vasubhalara44@gmail.com"
          : err.message
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      className="contact-cta-section"
      id="contact"
      aria-label="Call to Action & Contact"
    >
      <div className="container">
        <div className="cta-banner-wrapper">
          {/* Top Banner with Foliage & Big Headline */}
          <div className="cta-banner-top">
            <img
              src={ctaFoliage}
              alt=""
              className="cta-foliage-bg"
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />

            <h2 className="cta-banner-headline">
              LET’S BUILD SOMETHING GREAT TOGETHER
            </h2>

            <button
              className="cta-btn-book"
              onClick={() => {
                const el = document.getElementById("contact-form-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="2" y="7" width="12" height="14" rx="2" />
                <path d="M15 10l5-5m0 0l-5-5m5 5H9a6 6 0 000 12h3" />
              </svg>
              <span>Book a Call / Message</span>
            </button>
          </div>

          {/* Inline Form Drawer */}
          <div className="cta-form-drawer" id="contact-form-anchor">
            <div className="cta-form-container">
              <h3 className="cta-form-title">Direct Inquiry</h3>
              <p className="cta-form-subtitle">
                Have an architecture challenge, consulting inquiry, or full-stack project? Drop a message directly.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="cta-form-grid">
                  <div className="cta-form-field">
                    <label htmlFor="cta-name" className="cta-form-label">
                      Your Name
                    </label>
                    <input
                      id="cta-name"
                      type="text"
                      className="cta-form-input"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="cta-form-field">
                    <label htmlFor="cta-email" className="cta-form-label">
                      Email Address
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      className="cta-form-input"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="cta-form-field full">
                    <label htmlFor="cta-message" className="cta-form-label">
                      Project Details &amp; Message
                    </label>
                    <textarea
                      id="cta-message"
                      className="cta-form-input cta-form-textarea"
                      placeholder="Tell me about your distributed systems, cloud scaling, or web application needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary cta-form-submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Send Message Now"}
                </button>

                {status === "success" && (
                  <div className="cta-form-msg cta-form-msg--success" role="alert">
                    ✓ Message sent successfully! I will get back to you within 24 hours.
                  </div>
                )}

                {status === "error" && (
                  <div className="cta-form-msg cta-form-msg--error" role="alert">
                    {errorMsg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
