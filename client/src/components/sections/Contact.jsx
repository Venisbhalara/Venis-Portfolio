import { useRef, useState } from "react";
import { gsap } from "../../lib/gsap.config";
import { useGSAP } from "../../hooks/useGSAP";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Contact() {
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  // Scroll animations
  useGSAP(
    (ctx) => {
      ctx.add(() => {
        // Left side info
        gsap.from(".contact-info > *", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-wrapper", start: "top 85%" },
        });

        // Right side form
        gsap.from(".contact-form-card", {
          x: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: { trigger: ".contact-wrapper", start: "top 85%" },
        });
      });
    },
    sectionRef,
    [],
  );

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle"); // clear error on type
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); // reset form

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="contact"
      id="contact"
      aria-label="Contact"
    >
      <div className="contact__glow" aria-hidden="true" />

      <div className="container">
        <div className="contact-wrapper">
          {/* ── Left side (Info) ───────────────── */}
          <div className="contact-info">
            <p className="section-label">Get In Touch</p>
            <h2 className="contact-heading">
              Let's build
              <br />
              something great.
            </h2>
            <p className="contact-text">
              I'm currently exploring new opportunities for Senior/Staff
              Engineering roles. If you have an exciting challenge, I'd love to
              hear about it.
            </p>

            <a href="mailto:[vasubhalara44@gmail.com]" className="contact-link">
              vasubhalara44@gmail.com
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* ── Right side (Form) ──────────────── */}
          <div className="contact-form-card">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="name" className="form-label">
                  Name
                </label>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email" className="form-label">
                  Email
                </label>
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  className="form-input"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="message" className="form-label">
                  Message
                </label>
              </div>

              <button
                type="submit"
                className="btn btn--primary contact-submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <div
                  className="form-message form-message--success"
                  role="alert"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Message sent successfully!
                </div>
              )}

              {status === "error" && (
                <div className="form-message form-message--error" role="alert">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
