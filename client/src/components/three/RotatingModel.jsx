import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────────
   Crystalline core — an icosahedron with a distort shader.
   It breathes and morphs slowly, giving it an organic premium feel.
───────────────────────────────────────────────────────────────*/
function Crystal() {
  const mesh  = useRef(null);
  const wire  = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.08;
      mesh.current.rotation.z = t * 0.05;
    }
    if (wire.current) {
      wire.current.rotation.x = -t * 0.06;
      wire.current.rotation.y =  t * 0.10;
    }
  });

  return (
    // Float gives a gentle sine-wave float (no GSAP needed)
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      {/* Solid distorted sphere */}
      <mesh ref={mesh} castShadow>
        <icosahedronGeometry args={[1.8, 4]} />
        <MeshDistortMaterial
          color="#6C63FF"
          distort={0.38}        /* morphing intensity */
          speed={1.6}
          roughness={0.1}
          metalness={0.85}
          emissive="#200090"
          emissiveIntensity={0.3}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Outer wireframe — slightly larger, rotates counter */}
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
        <icosahedronGeometry args={[1.8, 4]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
    </Float>
  );
}

/* ─────────────────────────────────────────────────────────────
   Orbital ring — thin torus rotating around the crystal.
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
      <torusGeometry args={[2.7, 0.018, 16, 100]} />
      <meshBasicMaterial color="#6C63FF" transparent opacity={0.35} />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────
   RotatingModel — exported R3F canvas.
   Sized to a square; caller controls dimensions via className.
───────────────────────────────────────────────────────────────*/
export default function RotatingModel({ className = '' }) {
  const isMobile = window.innerWidth < 768;

  return (
    <div className={`rotating-model ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]}   intensity={2}   color="#6C63FF" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#00D9FF" />
        <pointLight position={[0, -4, 3]}  intensity={0.5} color="#ffffff" />

        <Crystal />
        {!isMobile && <OrbitalRing />}
      </Canvas>

      {/* Radial glow beneath the canvas */}
      <div className="rotating-model__glow" />
    </div>
  );
}
