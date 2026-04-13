import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";

/* ─────────────────────────────────────────────────────────────
   Crystalline core — an icosahedron with a distort shader.
   PERF: Reduced detail 4→3 (saves ~40% triangles), shader speed 1.6→1.0.
───────────────────────────────────────────────────────────────*/
function Crystal() {
  const mesh = useRef(null);
  const wire = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.08;
      mesh.current.rotation.z = t * 0.05;
    }
    if (wire.current) {
      wire.current.rotation.x = -t * 0.06;
      wire.current.rotation.y = t * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      {/* Solid distorted sphere — detail 3 saves triangles vs detail 4 */}
      <mesh ref={mesh} castShadow>
        <icosahedronGeometry args={[1.8, 3]} />
        <MeshDistortMaterial
          color="#6C63FF"
          distort={0.38}
          speed={1.0} /* was 1.6 — cheaper per-frame shader cost */
          roughness={0.1}
          metalness={0.85}
          emissive="#200090"
          emissiveIntensity={0.3}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Outer wireframe */}
      <mesh ref={wire} scale={1.22}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial
          color="#00D9FF"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Inner bright core */}
      <mesh scale={0.42}>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
    </Float>
  );
}

/* ─────────────────────────────────────────────────────────────
   Orbital ring — PERF: segments reduced 100 → 48.
───────────────────────────────────────────────────────────────*/
function OrbitalRing() {
  const ring = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ring.current) {
      ring.current.rotation.x = Math.PI / 2.8 + Math.sin(t * 0.3) * 0.15;
      ring.current.rotation.z = t * 0.14;
    }
  });

  return (
    <mesh ref={ring}>
      <torusGeometry args={[2.7, 0.018, 12, 48]} />
      <meshBasicMaterial color="#6C63FF" transparent opacity={0.35} />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────
   RotatingModel — exported R3F canvas.
   PERF: DPR capped at 1.5 (was 2.0). Render loop paused via
   IntersectionObserver when About section is off-screen — stops
   burning GPU on an invisible canvas.
───────────────────────────────────────────────────────────────*/
export default function RotatingModel({ className = "" }) {
  const isMobile = window.innerWidth < 768;
  const wrapRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Only render when the About section canvas is in the viewport
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "100px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`rotating-model ${className}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]} /* was [1,2] */
        frameloop={isVisible ? "always" : "demand"} /* pause when off-screen */
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#6C63FF" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#00D9FF" />
        <pointLight position={[0, -4, 3]} intensity={0.5} color="#ffffff" />

        <Crystal />
        {!isMobile && <OrbitalRing />}
      </Canvas>

      {/* Radial glow beneath the canvas */}
      <div className="rotating-model__glow" />
    </div>
  );
}
