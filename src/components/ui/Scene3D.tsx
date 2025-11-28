'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Low-poly Laptop with GSAP animation
function Laptop({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    // GSAP floating animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(groupRef.current.position, {
      y: position[1] + 0.3,
      duration: 2,
      ease: 'sine.inOut',
    });

    // Subtle rotation
    gsap.to(groupRef.current.rotation, {
      y: -0.5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      tl.kill();
      if (groupRef.current) gsap.killTweensOf(groupRef.current.rotation);
    };
  }, [position]);

  return (
    <group ref={groupRef} position={position} rotation={[0.1, -0.3, 0]}>
      {/* Base */}
      <RoundedBox args={[1.8, 0.08, 1.2]} radius={0.02} position={[0, 0, 0]}>
        <meshStandardMaterial color="#a78bfa" metalness={0.5} roughness={0.3} />
      </RoundedBox>
      {/* Screen */}
      <group position={[0, 0.55, -0.55]} rotation={[-0.3, 0, 0]}>
        <RoundedBox args={[1.7, 1.1, 0.05]} radius={0.02}>
          <meshStandardMaterial color="#8b5cf6" metalness={0.6} roughness={0.2} />
        </RoundedBox>
        {/* Screen display */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.5, 0.9]} />
          <meshStandardMaterial color="#1e1b4b" emissive="#4c1d95" emissiveIntensity={0.3} />
        </mesh>
      </group>
      {/* Keyboard area */}
      {/* <mesh position={[0, 0.05, 0.1]}>
        <planeGeometry args={[1.5, 0.9]} />
        <meshStandardMaterial color="#7c3aed" metalness={0.3} roughness={0.5} />
      </mesh> */}
    </group>
  );
}

// Low-poly Phone with GSAP animation
function Phone({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    // GSAP floating animation with different timing
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(groupRef.current.position, {
      y: position[1] + 0.25,
      duration: 1.8,
      ease: 'sine.inOut',
    });

    // Rotation animation
    gsap.to(groupRef.current.rotation, {
      z: 0.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      tl.kill();
      if (groupRef.current) gsap.killTweensOf(groupRef.current.rotation);
    };
  }, [position]);

  return (
    <group ref={groupRef} position={position} rotation={[0, 0.5, 0.1]}>
      {/* Phone body */}
      <RoundedBox args={[0.5, 1, 0.06]} radius={0.05}>
        <meshStandardMaterial color="#818cf8" metalness={0.7} roughness={0.2} />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[0.42, 0.88]} />
        <meshStandardMaterial color="#0f0a2e" emissive="#6366f1" emissiveIntensity={0.2} />
      </mesh>
      {/* Camera bump */}
      <mesh position={[0.12, 0.38, -0.04]}>
        <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
        <meshStandardMaterial color="#4c1d95" metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
}

// Low-poly Artist Palette with GSAP animation
function Palette({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

  useEffect(() => {
    if (!groupRef.current) return;

    // GSAP floating animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(groupRef.current.position, {
      y: position[1] + 0.35,
      duration: 2.2,
      ease: 'sine.inOut',
    });

    // Gentle wobble rotation
    gsap.to(groupRef.current.rotation, {
      x: 0.4,
      z: 0.2,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      tl.kill();
      if (groupRef.current) gsap.killTweensOf(groupRef.current.rotation);
    };
  }, [position]);

  return (
    <group ref={groupRef} position={position} rotation={[0.3, -0.2, 0.1]}>
      {/* Palette base - oval shape */}
      <mesh>
        <cylinderGeometry args={[0.9, 0.9, 0.08, 32]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>
      {/* Thumb hole */}
      <mesh position={[-0.4, 0.05, 0.2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      {/* Paint blobs */}
      {colors.map((color, i) => {
        const angle = (i / colors.length) * Math.PI * 1.3 - 0.3;
        const radius = 0.55;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0.08,
              Math.sin(angle) * radius - 0.1,
            ]}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
            <MeshDistortMaterial color={color} speed={2} distort={0.2} roughness={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

// Floating particles for atmosphere
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 50;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#a78bfa" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// Low-poly Avatar - Asian man with glasses, dark hair, checkered shirt
function Avatar({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    // Gentle breathing/idle animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(groupRef.current.position, {
      y: position[1] + 0.05,
      duration: 2.5,
      ease: 'sine.inOut',
    });

    // Subtle head movement
    gsap.to(groupRef.current.rotation, {
      y: 0.15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      tl.kill();
      if (groupRef.current) gsap.killTweensOf(groupRef.current.rotation);
    };
  }, [position]);

  return (
    <group ref={groupRef} position={position}>
      {/* Body/Torso - dark checkered shirt */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.45, 0.55, 0.9, 8]} />
        <meshStandardMaterial color="#2d3748" roughness={0.8} />
      </mesh>
      
      {/* Shirt pattern lines (simplified checkered look) */}
      {[...Array(4)].map((_, i) => (
        <mesh key={`h-${i}`} position={[0, -0.85 + i * 0.2, 0.46]}>
          <boxGeometry args={[0.8, 0.02, 0.02]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
      ))}
      {[...Array(3)].map((_, i) => (
        <mesh key={`v-${i}`} position={[-0.25 + i * 0.25, -0.6, 0.46]}>
          <boxGeometry args={[0.02, 0.7, 0.02]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
      ))}

      {/* Neck */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.2, 8]} />
        <meshStandardMaterial color="#e8beac" roughness={0.6} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#e8beac" roughness={0.6} />
      </mesh>

      {/* Hair - dark, slightly styled */}
      <mesh position={[0, 0.55, -0.05]}>
        <sphereGeometry args={[0.38, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      {/* Hair sides */}
      <mesh position={[-0.3, 0.4, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0.3, 0.4, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      {/* Hair front/bangs */}
      <mesh position={[0, 0.6, 0.2]}>
        <boxGeometry args={[0.5, 0.15, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Glasses frame */}
      <group position={[0, 0.38, 0.35]}>
        {/* Left lens */}
        <mesh position={[-0.13, 0, 0]}>
          <torusGeometry args={[0.1, 0.015, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} />
        </mesh>
        {/* Right lens */}
        <mesh position={[0.13, 0, 0]}>
          <torusGeometry args={[0.1, 0.015, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} />
        </mesh>
        {/* Bridge */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.06, 0.02, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} />
        </mesh>
        {/* Left arm */}
        <mesh position={[-0.25, 0, -0.1]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.15, 0.015, 0.015]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} />
        </mesh>
        {/* Right arm */}
        <mesh position={[0.25, 0, -0.1]} rotation={[0, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.015, 0.015]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} />
        </mesh>
        {/* Lens glass (slightly reflective) */}
        <mesh position={[-0.13, 0, 0.01]}>
          <circleGeometry args={[0.085, 16]} />
          <meshStandardMaterial color="#a0aec0" transparent opacity={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0.13, 0, 0.01]}>
          <circleGeometry args={[0.085, 16]} />
          <meshStandardMaterial color="#a0aec0" transparent opacity={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Eyes */}
      <mesh position={[-0.12, 0.38, 0.36]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      <mesh position={[0.12, 0.38, 0.36]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>

      {/* Eyebrows */}
      <mesh position={[-0.12, 0.48, 0.35]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.12, 0.025, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.12, 0.48, 0.35]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.12, 0.025, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 0.3, 0.4]}>
        <coneGeometry args={[0.04, 0.1, 4]} />
        <meshStandardMaterial color="#d4a590" roughness={0.7} />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 0.18, 0.38]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[0.08, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#c17c74" />
      </mesh>

      {/* Ears */}
      <mesh position={[-0.38, 0.35, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#e8beac" roughness={0.6} />
      </mesh>
      <mesh position={[0.38, 0.35, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#e8beac" roughness={0.6} />
      </mesh>

      {/* Shoulders */}
      <mesh position={[-0.5, -0.5, 0]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.12, 0.3, 4, 8]} />
        <meshStandardMaterial color="#2d3748" roughness={0.8} />
      </mesh>
      <mesh position={[0.5, -0.5, 0]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.12, 0.3, 4, 8]} />
        <meshStandardMaterial color="#2d3748" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Camera animation on mount
function CameraAnimation() {
  const { camera } = useThree();

  useEffect(() => {
    // Start camera from a different position
    camera.position.set(3, 2, 8);

    // Animate to final position
    gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: 5,
      duration: 2,
      ease: 'power2.out',
    });
  }, [camera]);

  return null;
}

export function Scene3D({ className = '' }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Camera intro animation */}
        <CameraAnimation />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#a78bfa" />
        <pointLight position={[0, 2, 2]} intensity={0.5} color="#818cf8" />

        {/* Objects with GSAP animations */}
        <Laptop position={[-1.5, 0.8, 0]} />
        <Phone position={[1.8, 0.3, 0.5]} />
        <Palette position={[0.5, 1.4, -1]} />
        
        {/* Avatar below the objects */}
        <Avatar position={[0, -1.2, 0.5]} />

        {/* Atmosphere */}
        <Particles />
      </Canvas>
    </div>
  );
}

export default Scene3D;
