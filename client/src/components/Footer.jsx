import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer-section" aria-label="Footer">
      <div className="container">
        {/* 3 Directory Columns */}
        <div className="footer-directory-grid">
          <div className="footer-col">
            <h3 className="footer-col-title">Main Page</h3>
            <ul className="footer-links">
              <li><a href="#home" className="footer-link">Home</a></li>
              <li><a href="#stats" className="footer-link">Stats &amp; Impact</a></li>
              <li><a href="#case-study" className="footer-link">Case Studies</a></li>
              <li><a href="#capabilities" className="footer-link">Capabilities</a></li>
              <li><a href="#journal" className="footer-link">Journal</a></li>
              <li><a href="#contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Focus Areas</h3>
            <ul className="footer-links">
              <li><span className="footer-link">Distributed Systems &amp; Go</span></li>
              <li><span className="footer-link">Cloud Infrastructure (AWS)</span></li>
              <li><span className="footer-link">Kafka Real-Time Streaming</span></li>
              <li><span className="footer-link">P99 Latency Optimization</span></li>
              <li><span className="footer-link">High-Availability APIs</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Connect</h3>
            <ul className="footer-links">
              <li>
                <a
                  href="https://github.com/Venisbhalara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/venis-bhalara-8089642a7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href="mailto:vasubhalara44@gmail.com" className="footer-link">
                  vasubhalara44@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Download Resume (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Attribution Bar */}
        <div className="footer-bottom-bar">
          <div>
            <span>Crafted with Antony System • Venis Bhalara</span>
          </div>
          <div>
            <span>Copyright © {new Date().getFullYear()} Venis Bhalara. All rights reserved.</span>
          </div>
        </div>

        {/* Massive Architectural Outline Signature Watermark */}
        <div className="footer-watermark-wrap" aria-hidden="true">
          <svg
            className="footer-watermark-svg"
            viewBox="0 -20 1200 200"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="footerWatermarkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e94722" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#e94722" stopOpacity="0.18" />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="135"
              textAnchor="middle"
              className="footer-watermark-svg-text"
              textLength="1180"
              lengthAdjust="spacing"
            >
              VENIS BHALARA
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
