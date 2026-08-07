"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function Sphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.25;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 6]} />
      <meshStandardMaterial
        color="#6ee7b7"
        wireframe
        roughness={0.6}
        metalness={0.2}
        flatShading
      />
    </mesh>
  );
}

function Particles() {
  const positions = useMemo(() => {
    const count = 300;
    const arr = new Float32Array(count * 3);
    let seed = 42;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < count; i++) {
      const r = 2.4 + rand() * 1.6;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#6ee7b7" size={0.03} transparent opacity={0.7} />
    </points>
  );
}

export function Scene() {
  return (
    <div className="h-64 w-64 sm:h-80 sm:w-80" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={20} />
        <Suspense fallback={null}>
          <Sphere />
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}