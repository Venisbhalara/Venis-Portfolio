import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap.config';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const isDesktop = typeof window !== 'undefined' ? window.innerWidth > 1024 : true;

  useEffect(() => {
    // Only run on desktop
    if (!isDesktop) return;

    // quickSetters for hyper-performance
    const setCursorX = gsap.quickSetter(cursorRef.current, 'x', 'px');
    const setCursorY = gsap.quickSetter(cursorRef.current, 'y', 'px');
    const setFollowerX = gsap.quickSetter(followerRef.current, 'x', 'px');
    const setFollowerY = gsap.quickSetter(followerRef.current, 'y', 'px');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Inner dot strictly follows mouse without delay
      setCursorX(mouseX);
      setCursorY(mouseY);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Follower uses gsap ticker for a smooth trailing spring effect
    let followerX = mouseX;
    let followerY = mouseY;
    
    // Magnetic state tracking
    let isHovering = false;

    const onTick = () => {
      const ease = isHovering ? 0.3 : 0.15;
      followerX += (mouseX - followerX) * ease;
      followerY += (mouseY - followerY) * ease;
      setFollowerX(followerX);
      setFollowerY(followerY);
    };

    gsap.ticker.add(onTick);

    // Add expansion hover to interactive elements (links, buttons, inputs)
    const interactables = document.querySelectorAll('a, button, input, textarea, .project-card');
    
    const onHoverIn = () => {
      isHovering = true;
      gsap.to(followerRef.current, {
        scale: 2.5,
        backgroundColor: '#6C63FF',
        opacity: 0.3,
        duration: 0.3,
        ease: 'power3.out',
      });
      gsap.to(cursorRef.current, { scale: 0, duration: 0.2 });
    };

    const onHoverOut = () => {
      isHovering = false;
      gsap.to(followerRef.current, {
        scale: 1,
        backgroundColor: 'transparent',
        opacity: 1,
        duration: 0.3,
        ease: 'power3.out',
      });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };

    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(onTick);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
    };
  }, [isDesktop]);

  if (!isDesktop) return null; // Standard OS cursor on mobile

  return (
    <>
      {/* Tiny solid dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '6px', height: '6px',
          backgroundColor: '#00D9FF',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference',
        }}
      />
      {/* Hollow trailing circle */}
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '40px', height: '40px',
          border: '1px solid rgba(108, 99, 255, 0.4)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transformOrigin: 'center center',
        }}
      />
    </>
  );
}
