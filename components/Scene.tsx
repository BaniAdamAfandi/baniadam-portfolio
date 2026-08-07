"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

const LABELS = [
  "IndonesiaForklift",
  "Product Owner",
  "Software QA",
  "DepositoBPR",
  "GA4",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Analytics",
  "Google Ads",
  "WordPress",
];

// per-label orbit radius multiplier — stagger chips onto concentric rings so
// adjacent labels sweep different radii instead of colliding on one orbit.
const RINGS = [0.33, 0.593, 0.742, 1.054, 1.07, 1.696, 0.814, 0.936, 1.25, 1.247, 1.207, 0.581, 0.209];

// per-label drift direction (staggered so chips slowly separate over time).
// Index-aligned with LABELS/RINGS: deleting a label must delete the same
// index here or the alignment silently breaks.
const ORBITS = [
  { r: 1 },
  { r: -1 },
  { r: 1 },
  { r: -1 },
  { r: 1 },
  { r: -1 },
  { r: 1 },
  { r: -1 },
  { r: 1 },
  { r: -1 },
  { r: 1 },
  { r: -1 },
  { r: 1 },
];

// widest labels get a slightly smaller font so they still fit inside the box
const LONG_LABELS: Record<string, boolean> = {
  IndonesiaForklift: true,
  "Product Owner": true,
};

const BURST_COUNT = 48;
const BURST_LIFE = 0.9;

// angular position of the label ring (fraction of a turn), written by the
// canvas frame loop, read by the label DOM loop — no React re-renders.
type SpinStore = { orbY: number };

const TAU = Math.PI * 2;

// labels ride a circle around the sphere, driven by the sphere's own turn so
// the whole ring rotates with the globe ("tulisan ikut muter ngikutin
// lingkaran"). Positions are mutated on a rAF loop; text never rotates, so
// chips stay upright and readable while they travel.
function FloatingLabels({ narrow, store }: { narrow: boolean; store: SpinStore }) {
  const reduce = useReducedMotion();
  const chips = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const t0 = performance.now();
    const step = () => {
      const orb = store.orbY * TAU;
      const now = (performance.now() - t0) / 1000;
      chips.current.forEach((el, j) => {
        if (!el) return;
        const i = narrow ? j * 2 : j;
        const { r } = ORBITS[i];
        const angle = orb + (TAU * i * r) / LABELS.length + now * 0.05 * r;
        const R = RINGS[i] * 24;
        el.style.left = `calc(50% + ${Math.sin(angle) * R}%)`;
        el.style.top = `calc(50% + ${Math.cos(angle) * R}%)`;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduce, narrow, store]);

  // On narrow (mobile) show a subset — small widths can't fit all chips without overlap
  const visible = narrow ? LABELS.filter((_, i) => i % 2 === 0) : LABELS;

  return (
    <div className="pointer-events-none absolute inset-0">
      {visible.map((label, j) => {
        const i = narrow ? j * 2 : j;
        const { r } = ORBITS[i];
        const angle0 = (TAU * i * r) / LABELS.length;
        const R = RINGS[i] * 24;
        return (
          <span
            key={label}
            ref={(el) => {
              chips.current[j] = el;
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-emerald-400/30 bg-card/70 px-2.5 py-1 font-medium text-emerald-200/90 shadow-[0_0_14px_rgba(110,231,183,0.15)] backdrop-blur-sm ${
              narrow ? "text-[10px]" : LONG_LABELS[label] ? "text-[11px]" : "text-xs"
            }`}
            style={{
              left: `calc(50% + ${Math.sin(angle0) * R}%)`,
              top: `calc(50% + ${Math.cos(angle0) * R}%)`,
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}

function HeroScene({ store, narrow }: { store: SpinStore; narrow: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const dust = useRef<THREE.Group>(null);
  const burstPoints = useRef<THREE.Points>(null);
  const burstAttr = useRef<THREE.BufferAttribute>(null);
  const burstMat = useRef<THREE.PointsMaterial>(null);
  const scrollY = useRef(0);

  const dustPositions = useMemo(() => {
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

  const burstPos = useMemo(() => new Float32Array(BURST_COUNT * 3), []);
  const burstBase = useMemo(() => new Float32Array(BURST_COUNT * 3), []);
  const burstVel = useMemo(() => new Float32Array(BURST_COUNT * 3), []);
  const burstAge = useRef(-1);
  const pulse = useRef(0);
  const spin = useRef(1);
  // rotation eased toward the pointer (desktop) or scroll tilt (mobile)
  const targetRot = useRef(new THREE.Vector2(0, 0));
  const rot = useRef(new THREE.Vector2(0, 0));
  const t = useRef(0);

  // Mobile has no hover: react to scroll instead. Mutate a ref — no re-renders.
  useEffect(() => {
    scrollY.current = window.scrollY;
    const onScroll = () => (scrollY.current = window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    t.current += delta;
    pulse.current = Math.max(0, pulse.current - delta * 2.4);
    spin.current = Math.max(1, spin.current - delta * 1.6);

    const m = mesh.current;
    if (m) {
      if (narrow) {
        // scroll tilt (gentle sway as the page moves)
        targetRot.current.x = Math.sin(scrollY.current * 0.0016) * 0.18;
        targetRot.current.y = Math.cos(scrollY.current * 0.0011) * 0.22 + t.current * 0.22;
      } else {
        // follow the pointer, plus a slow idle drift so it never freezes
        targetRot.current.x = state.pointer.y * 0.35;
        targetRot.current.y = state.pointer.x * 0.35 + t.current * 0.22;
      }
      rot.current.lerp(targetRot.current, Math.min(1, delta * 4));

      const breathe = 1 + Math.sin(t.current * 1.4) * 0.025;
      m.scale.setScalar(breathe * (1 + pulse.current * 0.22));
      m.rotation.x = rot.current.x + Math.sin(t.current * 0.5) * 0.1;
      m.rotation.y = rot.current.y * spin.current + Math.cos(t.current * 0.35) * 0.08;
    }
    if (dust.current) dust.current.rotation.y += delta * 0.02;

    // label ring turns with the sphere (also spins up during the click burst)
    store.orbY = (store.orbY + delta * 0.045 * spin.current) % 1;

    if (burstAge.current >= 0) {
      burstAge.current += delta;
      const k = burstAge.current / BURST_LIFE;
      if (k >= 1) {
        burstAge.current = -1;
        if (burstPoints.current) burstPoints.current.visible = false;
      } else {
        for (let i = 0; i < BURST_COUNT; i++) {
          const i3 = i * 3;
          burstPos[i3] = burstBase[i3] + burstVel[i3] * burstAge.current;
          burstPos[i3 + 1] = burstBase[i3 + 1] + burstVel[i3 + 1] * burstAge.current;
          burstPos[i3 + 2] = burstBase[i3 + 2] + burstVel[i3 + 2] * burstAge.current;
        }
        if (burstAttr.current) burstAttr.current.needsUpdate = true;
        if (burstMat.current) burstMat.current.opacity = (1 - k) * 0.9;
        if (burstPoints.current) burstPoints.current.visible = true;
      }
    }
  });

  const onBurst = (e: ThreeEvent<MouseEvent>) => {
    const p = e.point.clone();
    const dir = p.clone().normalize();
    for (let i = 0; i < BURST_COUNT; i++) {
      const d = new THREE.Vector3(
        dir.x + (Math.random() - 0.5) * 0.9,
        dir.y + (Math.random() - 0.5) * 0.9,
        dir.z + (Math.random() - 0.5) * 0.9
      ).normalize();
      const s = 1.4 + Math.random() * 1.8;
      const i3 = i * 3;
      burstBase[i3] = p.x;
      burstBase[i3 + 1] = p.y;
      burstBase[i3 + 2] = p.z;
      burstVel[i3] = d.x * s;
      burstVel[i3 + 1] = d.y * s;
      burstVel[i3 + 2] = d.z * s;
    }
    burstAge.current = 0;
    pulse.current = 1;
    spin.current = 3;
  };

  return (
    <group>
      <group rotation={[0.4, 0, 0.25]}>
        <mesh
          ref={mesh}
          onClick={onBurst}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "")}
        >
          <icosahedronGeometry args={[1, 6]} />
          <meshStandardMaterial
            color="#6ee7b7"
            wireframe
            roughness={0.6}
            metalness={0.2}
            flatShading
          />
        </mesh>
        <group ref={dust}>
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#6ee7b7" size={0.03} transparent opacity={0.7} />
          </points>
        </group>
      </group>
      <points ref={burstPoints} visible={false}>
        <bufferGeometry>
          <bufferAttribute ref={burstAttr} attach="attributes-position" args={[burstPos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={burstMat}
          color="#a7f3d0"
          size={0.045}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
export function Scene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [narrow, setNarrow] = useState(false);
  const store = useMemo<SpinStore>(() => ({ orbY: 0 }), []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setNarrow(e.contentRect.width < 300));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrap} className="relative h-64 w-64 sm:h-80 sm:w-80" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={20} />
        <Suspense fallback={null}>
          <HeroScene store={store} narrow={narrow} />
        </Suspense>
      </Canvas>
      <FloatingLabels narrow={narrow} store={store} />
    </div>
  );
}