import { useRef } from "react";
import { gsap } from "../lib/gsap.config";
import { useGSAP } from "../hooks/useGSAP";
import "../styles/preloader.css";

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Reveal Text
      tl.to(textRef.current.children, {
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
      });

      // 2. Animate Bar
      tl.to(
        barRef.current,
        {
          width: "100%",
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.4",
      );

      // 3. Exit Animation
      tl.to(
        textRef.current.children,
        {
          y: "-100%",
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.in",
        },
        "+=0.2",
      );

      tl.to(
        barRef.current,
        {
          opacity: 0,
          duration: 0.3,
        },
        "-=0.4",
      );

      // Slide up entire preloader
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut",
        },
        "-=0.2",
      );
    },
    [],
    containerRef,
  );

  return (
    <div ref={containerRef} className="preloader" aria-hidden="true">
      <div className="preloader__content">
        <div ref={textRef} className="preloader__logo">
          <span>W</span>
          <span>E</span>
          <span>L</span>
          <span>C</span>
          <span>O</span>
          <span>M</span>
          <span>E</span>
        </div>
        <div className="preloader__bar-container">
          <div ref={barRef} className="preloader__bar" />
        </div>
      </div>
    </div>
  );
}
