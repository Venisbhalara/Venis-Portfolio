import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

/* ─────────────────────────────────────────────────────────────
   Neural Quantum Core — 3D Cybernetic Architecture Node
   - Faceted crystalline gem with flat shading (luminous reflections)
   - Radiant inner singularity core
   - Counter-rotating wireframe shell
   - Dual gyroscopic orbital rings with revolving data nodes
   - Fluid cursor-tracking with inertial damping (Zero Lag)
───────────────────────────────────────────────────────────────*/
function QuantumCore() {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const innerRef = useRef(null);
  const wireRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const sat1Ref = useRef(null);
  const sat2Ref = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Smooth cursor follow with inertia (zero jank)
    if (groupRef.current) {
      const targetRotY = state.pointer.x * 0.45;
      const targetRotX = -state.pointer.y * 0.35;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
    }

    // Core polyhedral rotation
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.22;
      coreRef.current.rotation.z = Math.sin(t * 0.18) * 0.12;
    }

    // Inner singularity pulse
    if (innerRef.current) {
      const scale = 0.5 + Math.sin(t * 2.2) * 0.06;
      innerRef.current.scale.set(scale, scale, scale);
    }

    // Outer wireframe counter-rotation
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.16;
      wireRef.current.rotation.x = t * 0.1;
    }

    // Gyroscopic Ring 1 & Data Satellite
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.18;
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.25) * 0.1;
    }
    if (sat1Ref.current) {
      const angle = t * 1.1;
      const r = 2.2;
      sat1Ref.current.position.x = Math.cos(angle) * r;
      sat1Ref.current.position.y = Math.sin(angle) * r;
    }

    // Gyroscopic Ring 2 & Data Satellite
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.2;
      ring2Ref.current.rotation.x = -Math.PI / 4 + Math.cos(t * 0.22) * 0.12;
    }
    if (sat2Ref.current) {
      const angle = -t * 0.95;
      const r = 2.55;
      sat2Ref.current.position.x = Math.cos(angle) * r;
      sat2Ref.current.position.z = Math.sin(angle) * r;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.4}>
        {/* ── Faceted Quantum Crystal (Flat Shading for glowing geometric facets) ── */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.35, 0]} />
          <meshStandardMaterial
            color="#22124d"
            emissive="#6C63FF"
            emissiveIntensity={0.65}
            roughness={0.15}
            metalness={0.3}
            flatShading={true}
            transparent={true}
            opacity={0.9}
          />
        </mesh>

        {/* ── Inner Glowing Singularity Core ── */}
        <mesh ref={innerRef}>
          <sphereGeometry args={[0.48, 16, 16]} />
          <meshBasicMaterial color="#00D9FF" />
        </mesh>

        {/* ── Nested Luminous Wireframe Shell ── */}
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[1.65, 0]} />
          <meshBasicMaterial
            color="#00D9FF"
            wireframe={true}
            transparent={true}
            opacity={0.32}
          />
        </mesh>

        {/* ── Ring 1 (Tilted Primary Orbit) ── */}
        <group ref={ring1Ref}>
          <mesh>
            <torusGeometry args={[2.2, 0.016, 12, 64]} />
            <meshStandardMaterial
              color="#6C63FF"
              emissive="#6C63FF"
              emissiveIntensity={0.9}
            />
          </mesh>
          {/* Data Satellite 1 */}
          <mesh ref={sat1Ref}>
            <sphereGeometry args={[0.075, 12, 12]} />
            <meshBasicMaterial color="#00D9FF" />
          </mesh>
        </group>

        {/* ── Ring 2 (Orthogonal Secondary Orbit) ── */}
        <group ref={ring2Ref}>
          <mesh>
            <torusGeometry args={[2.55, 0.014, 12, 64]} />
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#00D9FF"
              emissiveIntensity={0.9}
            />
          </mesh>
          {/* Data Satellite 2 */}
          <mesh ref={sat2Ref}>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshBasicMaterial color="#6C63FF" />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   RotatingModel — Exported 3D Canvas
   Strict Performance Guarantees:
   - Paused when off-screen via IntersectionObserver
   - Clamped DPR to prevent 4K overhead
   - Clean hardware-accelerated materials (zero distort shader lag)
───────────────────────────────────────────────────────────────*/
export default function RotatingModel({ className = "" }) {
  const wrapRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Only render when the About section canvas is in the viewport
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "120px" },
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
        camera={{ position: [0, 0, 6.2], fov: 48 }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? "always" : "demand"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent", pointerEvents: "auto" }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[6, 6, 6]} intensity={3.0} color="#00D9FF" />
        <pointLight position={[-6, -5, -4]} intensity={2.5} color="#6C63FF" />
        <directionalLight position={[0, 4, 8]} intensity={1.2} color="#ffffff" />

        <QuantumCore />
      </Canvas>

      {/* Radial glow backdrop */}
      <div className="rotating-model__glow" />
    </div>
  );
}
