import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// ── Cinematic Camera Rig ─────────────────────────────────────────
function CameraController({ introPhase, mousePos }) {
  const { camera } = useThree();
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const t = delta * 1.5;

    if (introPhase === 0) {
      // Phase 0: Distant view of Eiffel Tower, gentle dolly in
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, t);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, -0.2, t);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 9.5, t * 0.7);
      targetLookAt.current.set(0, 0.5, 0);
    } else if (introPhase === 1) {
      // Phase 1: Dolly closer and tilt upwards toward the spire
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, t);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.8, t * 0.9);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.5, t);
      targetLookAt.current.set(0, 2.2, 0);
    } else if (introPhase === 2 || introPhase === 3) {
      // Phase 2-3: Smooth turn to the right into the Parisian street scene
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 3.8, t * 0.8);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.2, t * 0.8);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.0, t * 0.8);
      targetLookAt.current.set(3.2, 0.8, -2);
    } else {
      // Phase 4 (Homepage state): Subtle mouse parallax around the sunset panorama
      const targetX = (mousePos.current.x * 1.2);
      const targetY = (mousePos.current.y * 0.8);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, t * 0.5);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + 0.5, t * 0.5);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8.5, t * 0.5);
      targetLookAt.current.set(targetX * 0.3, targetY * 0.3 + 0.5, 0);
    }

    camera.lookAt(targetLookAt.current);
  });

  return null;
}

// ── Eiffel Tower 3D Architectural Silhouette ──────────────────────
function EiffelTower({ introPhase }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle ambient swaying in Parisian wind
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[-0.2, -2.4, 0]}>
      {/* Base Arch */}
      <mesh position={[0, -0.1, 0]}>
        <torusGeometry args={[0.9, 0.08, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#503078" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Ground Legs */}
      <mesh position={[-1.0, 0.5, 0]} rotation={[0, 0, 0.16]}>
        <boxGeometry args={[0.22, 2.0, 0.22]} />
        <meshStandardMaterial color="#3A1C5A" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[1.0, 0.5, 0]} rotation={[0, 0, -0.16]}>
        <boxGeometry args={[0.22, 2.0, 0.22]} />
        <meshStandardMaterial color="#3A1C5A" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.5, -0.8]} rotation={[0.16, 0, 0]}>
        <boxGeometry args={[0.2, 2.0, 0.2]} />
        <meshStandardMaterial color="#321550" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Platform 1 */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#734B9E" emissive="#503078" emissiveIntensity={0.2} />
      </mesh>

      {/* Middle Section Legs */}
      <mesh position={[-0.45, 2.2, 0]} rotation={[0, 0, 0.09]}>
        <boxGeometry args={[0.16, 1.6, 0.16]} />
        <meshStandardMaterial color="#503078" />
      </mesh>
      <mesh position={[0.45, 2.2, 0]} rotation={[0, 0, -0.09]}>
        <boxGeometry args={[0.16, 1.6, 0.16]} />
        <meshStandardMaterial color="#503078" />
      </mesh>

      {/* Platform 2 */}
      <mesh position={[0, 3.0, 0]}>
        <boxGeometry args={[0.85, 0.08, 0.5]} />
        <meshStandardMaterial color="#B9A2E8" emissive="#734B9E" emissiveIntensity={0.3} />
      </mesh>

      {/* Upper Pillar */}
      <mesh position={[0, 4.0, 0]}>
        <boxGeometry args={[0.28, 2.0, 0.28]} />
        <meshStandardMaterial color="#6B4196" />
      </mesh>

      {/* Dome / Top Platform */}
      <mesh position={[0, 5.0, 0]}>
        <cylinderGeometry args={[0.18, 0.24, 0.2, 16]} />
        <meshStandardMaterial color="#B9A2E8" emissive="#B9A2E8" emissiveIntensity={0.4} />
      </mesh>

      {/* Spire with glowing pinnacle beacon */}
      <mesh position={[0, 5.8, 0]}>
        <coneGeometry args={[0.06, 1.5, 8]} />
        <meshStandardMaterial
          color="#FFF5E9"
          emissive="#F4A16C"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Beacon Light Glow */}
      <pointLight position={[0, 6.5, 0]} color="#F4A16C" intensity={1.5} distance={12} />
    </group>
  );
}

// ── Painted Parisian Street & Vintage Architecture (Right Side) ────
function ParisianStreet() {
  return (
    <group position={[3.8, -2.4, -2]}>
      {/* Street cobblestone base */}
      <mesh position={[0, -0.1, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7, 10]} />
        <meshStandardMaterial color="#1E1028" roughness={0.8} />
      </mesh>

      {/* Haussmann Building Facade 1 */}
      <mesh position={[-0.8, 1.8, -1]}>
        <boxGeometry args={[2.2, 4.5, 1.5]} />
        <meshStandardMaterial color="#37204F" roughness={0.7} />
      </mesh>

      {/* Haussmann Mansard Roof (Zinc Grey-Purple) */}
      <mesh position={[-0.8, 4.3, -1]} rotation={[0, 0, -0.15]}>
        <coneGeometry args={[1.5, 1.2, 4]} />
        <meshStandardMaterial color="#271538" roughness={0.6} />
      </mesh>

      {/* Warm Glowing Windows */}
      {[-0.4, 0.4].map((x, xi) =>
        [0.8, 1.8, 2.8].map((y, yi) => (
          <mesh key={`${xi}-${yi}`} position={[-0.8 + x, y, -0.2]}>
            <planeGeometry args={[0.3, 0.45]} />
            <meshBasicMaterial color="#F4A16C" transparent opacity={0.75} />
          </mesh>
        ))
      )}

      {/* Second Parisian Building */}
      <mesh position={[1.8, 2.2, -1.8]}>
        <boxGeometry args={[2.5, 5.2, 1.8]} />
        <meshStandardMaterial color="#2E1842" roughness={0.8} />
      </mesh>

      {/* Vintage Street Lamp */}
      <group position={[0.4, 0, 1.2]}>
        {/* Post */}
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 2.2, 8]} />
          <meshStandardMaterial color="#150B20" metalness={0.8} />
        </mesh>
        {/* Lantern Head */}
        <mesh position={[0, 2.25, 0]}>
          <octahedronGeometry args={[0.15]} />
          <meshBasicMaterial color="#FFF5E9" />
        </mesh>
        {/* Warm Golden Hour Lantern Light */}
        <pointLight position={[0, 2.25, 0]} color="#F4A16C" intensity={2.0} distance={6} />
      </group>
    </group>
  );
}

// ── Sunset Atmosphere, Clouds & Floating Golden Particles ─────────
function SunsetAtmosphere() {
  const cloudsRef = useRef();

  // Floating dusk clouds
  const cloudData = useMemo(() => [
    { pos: [-3.5, 3.2, -7], scale: [3.5, 1.4, 1.2], color: '#6A3E94', speed: 0.15 },
    { pos: [1.2, 2.8, -8], scale: [4.2, 1.6, 1.4], color: '#B9A2E8', speed: 0.2 },
    { pos: [4.5, 4.0, -9], scale: [3.8, 1.5, 1.2], color: '#F2B7CB', speed: 0.12 },
    { pos: [-1.0, 4.8, -10], scale: [5.0, 1.8, 1.5], color: '#F4A16C', speed: 0.18 },
    { pos: [-4.0, 1.5, -6], scale: [2.8, 1.2, 1.0], color: '#442268', speed: 0.1 },
  ], []);

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloud, i) => {
        cloud.position.x += Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.0015;
      });
    }
  });

  return (
    <>
      {/* Giant Sunset Sun Glow Sphere */}
      <mesh position={[1.5, 1.8, -14]}>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial color="#F4A16C" transparent opacity={0.22} />
      </mesh>
      <mesh position={[1.5, 1.8, -14]}>
        <sphereGeometry args={[7.0, 32, 32]} />
        <meshBasicMaterial color="#F2B7CB" transparent opacity={0.12} />
      </mesh>
      <mesh position={[1.5, 1.8, -14]}>
        <sphereGeometry args={[11.0, 32, 32]} />
        <meshBasicMaterial color="#503078" transparent opacity={0.08} />
      </mesh>

      {/* Volumetric Sunset Cloud Meshes */}
      <group ref={cloudsRef}>
        {cloudData.map((c, i) => (
          <Float key={i} speed={c.speed * 2} floatIntensity={0.4}>
            <mesh position={c.pos} scale={c.scale}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color={c.color} transparent opacity={0.18} />
            </mesh>
          </Float>
        ))}
      </group>
    </>
  );
}

// ── Floating Ethereal Particles ───────────────────────────────────
function FloatingEmbers() {
  const embers = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 14,
        Math.random() * 8 - 3,
        (Math.random() - 0.5) * 8,
      ],
      size: Math.random() * 0.08 + 0.02,
      color: ['#F4A16C', '#F2B7CB', '#B9A2E8', '#FFF5E9'][Math.floor(Math.random() * 4)],
      speed: Math.random() * 0.4 + 0.2,
    }))
  , []);

  return (
    <group>
      {embers.map((ember, i) => (
        <Float key={i} speed={ember.speed * 2} rotationIntensity={0.2} floatIntensity={0.8}>
          <mesh position={ember.pos}>
            <sphereGeometry args={[ember.size, 8, 8]} />
            <meshBasicMaterial color={ember.color} transparent opacity={0.65} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ── Root 3D Scene Export ──────────────────────────────────────────
export default function HeroScene({ introPhase = 0 }) {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, -0.2, 11], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <CameraController introPhase={introPhase} mousePos={mousePos} />

      {/* Lighting orchestrations */}
      <ambientLight intensity={0.4} color="#B9A2E8" />
      <directionalLight position={[6, 4, -4]} intensity={1.2} color="#F4A16C" />
      <pointLight position={[-4, 3, 2]} intensity={0.6} color="#B9A2E8" />
      <pointLight position={[3, 0, 4]} intensity={0.8} color="#F2B7CB" />

      {/* Scenery components */}
      <SunsetAtmosphere />
      <EiffelTower introPhase={introPhase} />
      <ParisianStreet />
      <FloatingEmbers />

      {/* Twilight stars */}
      <Stars
        radius={45}
        depth={30}
        count={800}
        factor={2}
        saturation={0.5}
        fade
        speed={0.4}
      />

      {/* Atmospheric Paris sunset fog */}
      <fog attach="fog" args={['#21112F', 6, 22]} />
    </Canvas>
  );
}
