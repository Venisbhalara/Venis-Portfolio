import { useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap.config';
import { useGSAP } from '../hooks/useGSAP';
import '../styles/scrollProgress.css';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useGSAP(() => {
    // scaleX tied directly to the scroll progress
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1, // Smoothly catch up
      }
    });
  }, [], barRef);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress__bar" />
    </div>
  );
}
