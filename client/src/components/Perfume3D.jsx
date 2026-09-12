/**
 * Perfume3D.jsx
 * 3D animated perfume bottle for AURA LUMIÈRE hero section.
 * Built with @react-three/fiber + @react-three/drei.
 */

import { memo, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  Environment,
  Text,
} from '@react-three/drei';
import * as THREE from 'three';

/* ─── Gold particle cloud ───────────────────────────────────────────────────── */
function Particles({ count = 300 }) {
  const ref = useRef();

  // Build buffer geometry manually for additive blending with Points
  const [positions, sizes] = useMemo(() => {
    const pos  = new Float32Array(count * 3);
    const sz   = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r     = 2.2 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = 0.018 + Math.random() * 0.012;
    }
    return [pos, sz];
  }, [count]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [positions, sizes]);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color:       new THREE.Color('#C9A961'),
        size:        0.022,
        sizeAttenuation: true,
        transparent: true,
        opacity:     0.75,
        depthWrite:  false,
        blending:    THREE.AdditiveBlending,
      }),
    []
  );

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.06;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.08;
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

/* ─── Bottle + cap + label + liquid ────────────────────────────────────────── */
function BottleGroup() {
  const groupRef = useRef();

  // MeshPhysicalMaterial props for glass body
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color:              new THREE.Color('#EDE8DF'),
        transparent:        true,
        opacity:            0.82,
        roughness:          0.04,
        metalness:          0.08,
        clearcoat:          1.0,
        clearcoatRoughness: 0.08,
        transmission:       0.88,
        thickness:          0.5,
        envMapIntensity:    1.8,
        side:               THREE.DoubleSide,
      }),
    []
  );

  const capMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color:     new THREE.Color('#1A1A1A'),
        roughness: 0.38,
        metalness: 0.32,
      }),
    []
  );

  const liquidMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color:       new THREE.Color('#E8C87A'),
        transparent: true,
        opacity:     0.50,
        roughness:   0.1,
        metalness:   0.0,
      }),
    []
  );

  const labelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color:     new THREE.Color('#FAF7F2'),
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  );

  // Bottle geometry — slightly rounded box
  const bottleGeo = useMemo(
    () => new THREE.BoxGeometry(1.5, 2.0, 0.5, 2, 2, 2),
    []
  );

  // Cap geometry — cylinder
  const capGeo = useMemo(
    () => new THREE.CylinderGeometry(0.38, 0.4, 0.62, 32),
    []
  );

  // Liquid (inner cylinder, only 60 % fill height)
  const liquidGeo = useMemo(
    () => new THREE.CylinderGeometry(0.68, 0.68, 1.2, 32),
    []
  );

  // Label plane
  const labelGeo = useMemo(
    () => new THREE.PlaneGeometry(1.0, 1.25),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y += 0.003;
    groupRef.current.position.y  = Math.sin(t * 0.8) * 0.08;
    groupRef.current.rotation.z  = Math.sin(t * 0.5) * 0.018;
  });

  return (
    <group ref={groupRef}>
      {/* ── Main bottle body ── */}
      <mesh geometry={bottleGeo} material={glassMaterial} castShadow />

      {/* ── Liquid fill (inside, slightly smaller) ── */}
      <mesh geometry={liquidGeo} material={liquidMaterial} position={[0, -0.41, 0]} />

      {/* ── Label plane on front face ── */}
      <mesh geometry={labelGeo} material={labelMaterial} position={[0, 0, 0.26]}>
        {/* "AL" monogram */}
        <Text
          position={[0, 0.38, 0.002]}
          fontSize={0.28}
          color="#2A2A2A"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/cormorantgaramond/v22/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQAllvuQ.woff2"
          fontWeight={600}
          letterSpacing={0.06}
        >
          AL
        </Text>

        {/* "AURA LUMIÈRE" */}
        <Text
          position={[0, 0.10, 0.002]}
          fontSize={0.095}
          color="#2A2A2A"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.18}
          font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        >
          AURA LUMIÈRE
        </Text>

        {/* "MARINE SERENE" */}
        <Text
          position={[0, -0.12, 0.002]}
          fontSize={0.085}
          color="#7B1E3A"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
          font="https://fonts.gstatic.com/s/cormorantgaramond/v22/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQAllvuQ.woff2"
          fontStyle="italic"
        >
          Marine Serene
        </Text>

        {/* "POUR HOMME" */}
        <Text
          position={[0, -0.32, 0.002]}
          fontSize={0.065}
          color="#8A8177"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.20}
          font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        >
          POUR HOMME
        </Text>

        {/* Gold divider line (thin box) */}
        <mesh position={[0, -0.02, 0.001]}>
          <planeGeometry args={[0.55, 0.006]} />
          <meshStandardMaterial color="#C9A961" />
        </mesh>
      </mesh>

      {/* ── Cap ── */}
      <mesh geometry={capGeo} material={capMaterial} position={[0, 1.31, 0]} castShadow />

      {/* ── Cap top disc (subtle flat top) ── */}
      <mesh position={[0, 1.62, 0]} castShadow>
        <cylinderGeometry args={[0.36, 0.36, 0.02, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* ── Neck ── */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.36, 0.12, 32]} />
        <meshPhysicalMaterial
          color="#EDE8DF"
          roughness={0.05}
          metalness={0.08}
          transmission={0.85}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

/* ─── Scene ─────────────────────────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.25}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 2, 3]}  intensity={0.55} color="#C9A961" />
      <pointLight position={[0, -2, -3]} intensity={0.32} color="#FFFFFF" />
      <pointLight position={[3, 0, -2]}  intensity={0.28} color="#FAF7F2" />

      {/* Studio environment for reflections */}
      <Environment preset="studio" />

      {/* Bottle */}
      <BottleGroup />

      {/* Gold particles */}
      <Particles count={300} />

      {/* Ground shadow */}
      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.28}
        scale={5}
        blur={2.2}
        far={2}
        color="#2A2A2A"
      />

      {/* Orbit controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}       // manual rotation via useFrame
        minPolarAngle={1.1}
        maxPolarAngle={1.85}
        enableDamping
        dampingFactor={0.06}
      />
    </>
  );
}

/* ─── Loading fallback ──────────────────────────────────────────────────────── */
export function Bottle3DFallback() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center select-none"
      style={{ backgroundColor: 'transparent' }}
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center font-serif text-2xl font-semibold border-2 animate-spin"
        style={{
          borderColor: '#C9A961',
          borderTopColor: 'transparent',
          color: '#7B1E3A',
        }}
        aria-label="Loading 3D bottle"
      />
      <p
        className="font-serif text-sm mt-4 opacity-50"
        style={{ color: '#7B1E3A', letterSpacing: '0.15em' }}
      >
        AURA LUMIÈRE
      </p>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────────── */
const Perfume3D = memo(function Perfume3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{
        alpha:           true,
        antialias:       true,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}
      shadows
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  );
});

export default Perfume3D;
