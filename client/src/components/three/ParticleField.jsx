import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────
   Particles mesh — drifting points in a sphere.
   PERF: Reduced count (700 desktop / 300 mobile), capped DPR at 1.5.
───────────────────────────────────────────────────────────────*/
function Particles({ count = 700 }) {
  const mesh = useRef(null);
  const light = useRef(null);

  // Build random positions once
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorA = new THREE.Color("#6C63FF"); // primary violet
    const colorB = new THREE.Color("#00D9FF"); // cyan accent
    const colorC = new THREE.Color("#ffffff"); // white

    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      const c =
        t < 0.5
          ? colorA.clone().lerp(colorB, t * 2)
          : colorB.clone().lerp(colorC, (t - 0.5) * 2);

      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  // Slow orbital rotation each frame
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.04;
      mesh.current.rotation.x = Math.sin(t * 0.02) * 0.15;
    }
    if (light.current) {
      light.current.position.x = Math.sin(t * 0.5) * 6;
      light.current.position.y = Math.cos(t * 0.4) * 4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight ref={light} intensity={1.5} color="#6C63FF" distance={30} />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Floating geometric rings — two tori that counter-rotate.
   PERF: Reduced tube segments from 100 → 60.
───────────────────────────────────────────────────────────────*/
function FloatingRings() {
  const ring1 = useRef(null);
  const ring2 = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.12;
      ring1.current.rotation.z = t * 0.08;
    }
    if (ring2.current) {
      ring2.current.rotation.y = -t * 0.1;
      ring2.current.rotation.x = t * 0.06;
    }
  });

  return (
    <>
      {/* Outer ring — 60 tube segments instead of 100 */}
      <mesh ref={ring1} position={[4, 1, -6]}>
        <torusGeometry args={[2.4, 0.015, 12, 60]} />
        <meshBasicMaterial color="#6C63FF" transparent opacity={0.18} />
      </mesh>

      {/* Inner ring */}
      <mesh ref={ring2} position={[-3, -1, -4]}>
        <torusGeometry args={[1.5, 0.012, 12, 60]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.14} />
      </mesh>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   ParticleField — exported canvas container.
   PERF: Pauses WebGL render loop when Hero section is off-screen
   via IntersectionObserver — saves GPU when user scrolls away.
───────────────────────────────────────────────────────────────*/
export default function ParticleField() {
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 300 : 700;
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause rendering when the hero canvas is off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 18], fov: 60 }}
        /* Cap DPR at 1.5 — was [1,2] which was very expensive */
        dpr={[1, 1.5]}
        /* "demand" = only re-render when frameloop is active */
        frameloop={isVisible ? "always" : "demand"}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Particles count={count} />
        {!isMobile && <FloatingRings />}
      </Canvas>
    </div>
  );
}
