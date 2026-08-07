"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motion, useReducedMotion } from "framer-motion";

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
  "REST API",
  "Figma",
  "WordPress",
];

const ANCHORS = [
  { x: "76%", y: "0%" },
  { x: "54%", y: "-26%" },
  { x: "47%", y: "59%" },
  { x: "13%", y: "59%" },
  { x: "-17%", y: "74%" },
  { x: "-37%", y: "47%" },
  { x: "-68%", y: "33%" },
  { x: "-76%", y: "0%" },
  { x: "-54%", y: "-26%" },
  { x: "-47%", y: "-59%" },
  { x: "-13%", y: "-59%" },
  { x: "17%", y: "-74%" },
  { x: "37%", y: "-47%" },
  { x: "68%", y: "-33%" },
  { x: "0%", y: "74%" },
];

const RINGS = [0.33, 0.593, 0.742, 1.054, 1.07, 1.696, 0.814, 0.936, 1.25, 1.247, 1.207, 0.581, 1.522, 0.965, 0.209];

// orbit duration + direction per label (staggered so chips rarely overlap)
const ORBITS = [
  { d: 26, r: 1 },
  { d: 34, r: -1 },
  { d: 22, r: 1 },
  { d: 40, r: -1 },
  { d: 28, r: 1 },
  { d: 44, r: -1 },
  { d: 24, r: 1 },
  { d: 38, r: -1 },
  { d: 30, r: 1 },
  { d: 42, r: -1 },
  { d: 26, r: 1 },
  { d: 36, r: -1 },
  { d: 32, r: 1 },
  { d: 46, r: -1 },
  { d: 29, r: 1 },
];

// widest labels get a slightly smaller font so they still fit inside the box
const LONG_LABELS: Record<string, boolean> = {
  IndonesiaForklift: true,
  "Product Owner": true,
};

const BURST_COUNT = 48;
const BURST_LIFE = 0.9;
const NODE_COUNT = 96;
const DUST_COUNT = 300;

// seeded LCG — same numbers every load, no Math.random in render loop
function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const NODE_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aPhase;
  attribute float aBoost;
  varying float vPulse;
  void main() {
    vPulse = 1.0 + aBoost * 0.5 * sin(uTime * 1.7 + aPhase);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uSize * vPulse * (320.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const NODE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying float vPulse;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.08, d) * vPulse;
    gl_FragColor = vec4(uColor * vPulse, a);
  }
`;

function FloatingLabels({ radius, narrow }: { radius: number; narrow: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0">
      {LABELS.map((label, i) => {
        const { d, r } = ORBITS[i];
        const a = ANCHORS[i];
        // anchor offsets in % of container, orbit shrinks on narrow widths
        const x = parseFloat(a.x) * radius * RINGS[i];
        const y = parseFloat(a.y) * radius * RINGS[i];
        return (
          <span
            key={label}
            className="absolute"
            style={{ left: `calc(50% + ${x}%)`, top: `calc(50% + ${y}%)` }}
          >
            <motion.span
              className="block"
              animate={reduce ? undefined : { rotate: 360 * r }}
              transition={{ duration: d, repeat: Infinity, ease: "linear" }}
            >
              <motion.span
                className="absolute block"
                style={{ left: 5, top: -6 }}
                animate={reduce ? undefined : { rotate: -360 * r }}
                transition={{ duration: d, repeat: Infinity, ease: "linear" }}
              >
                <span
                  className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-emerald-400/30 bg-card/70 px-2.5 py-1 font-medium text-emerald-200/90 shadow-[0_0_14px_rgba(110,231,183,0.15)] backdrop-blur-sm ${
                    narrow ? "text-[10px]" : LONG_LABELS[label] ? "text-[11px]" : "text-xs"
                  }`}
                >
                  {label}
                </span>
              </motion.span>
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}

function HeroScene() {
  const reduce = useReducedMotion();
  const graph = useRef<THREE.Group>(null);
  const dust = useRef<THREE.Group>(null);
  const nodeMat = useRef<THREE.ShaderMaterial>(null);
  const burstPoints = useRef<THREE.Points>(null);
  const burstAttr = useRef<THREE.BufferAttribute>(null);
  const burstMat = useRef<THREE.PointsMaterial>(null);

  // --- node cloud: positions + per-node pulse phase/boost ---
  const nodes = useMemo(() => {
    const rand = makeRng(42);
    const pos = new Float32Array(NODE_COUNT * 3);
    const phase = new Float32Array(NODE_COUNT);
    const boost = new Float32Array(NODE_COUNT);
    for (let i = 0; i < NODE_COUNT; i++) {
      // random direction, radius 1.5–3 biased outward → loose cloud, not a shell
      const r = 1.5 + Math.pow(rand(), 0.7) * 1.5;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      phase[i] = rand() * Math.PI * 2;
      boost[i] = rand() < 0.1 ? 1 : 0.3; // ~10 nodes pulse brightly
    }
    return { pos, phase, boost };
  }, []);

  // --- edges: each node links to its 2–4 nearest neighbors, deduped ---
  const edges = useMemo(() => {
    const rand = makeRng(1337);
    const seen = new Set<number>();
    const pairs: number[][] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const k = 2 + Math.floor(rand() * 3);
      const ix = i * 3;
      const dists: Array<[number, number]> = [];
      for (let j = 0; j < NODE_COUNT; j++) {
        if (j === i) continue;
        const jx = j * 3;
        const dx = nodes.pos[ix] - nodes.pos[jx];
        const dy = nodes.pos[ix + 1] - nodes.pos[jx + 1];
        const dz = nodes.pos[ix + 2] - nodes.pos[jx + 2];
        dists.push([j, dx * dx + dy * dy + dz * dz]);
      }
      dists.sort((a, b) => a[1] - b[1]);
      for (let n = 0; n < k; n++) {
        const j = dists[n][0];
        const key = Math.min(i, j) * NODE_COUNT + Math.max(i, j);
        if (!seen.has(key)) {
          seen.add(key);
          pairs.push([i, j]);
        }
      }
    }
    const arr = new Float32Array(pairs.length * 6);
    pairs.forEach(([a, b], p) => {
      const ax = a * 3;
      const bx = b * 3;
      arr[p * 6] = nodes.pos[ax];
      arr[p * 6 + 1] = nodes.pos[ax + 1];
      arr[p * 6 + 2] = nodes.pos[ax + 2];
      arr[p * 6 + 3] = nodes.pos[bx];
      arr[p * 6 + 4] = nodes.pos[bx + 1];
      arr[p * 6 + 5] = nodes.pos[bx + 2];
    });
    return arr;
  }, [nodes]);

  const dustPositions = useMemo(() => {
    const rand = makeRng(42);
    const arr = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      const r = 2.6 + rand() * 1.6;
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
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    pulse.current = Math.max(0, pulse.current - delta * 2.4);
    spin.current = Math.max(1, spin.current - delta * 1.6);

    const g = graph.current;
    if (g) {
      if (reduce) {
        g.rotation.z = 0.35;
      } else {
        g.rotation.x = t.current * 0.07 + Math.sin(t.current * 0.4) * 0.05;
        g.rotation.y = t.current * 0.13 * spin.current + Math.cos(t.current * 0.3) * 0.07;
        g.rotation.z = t.current * 0.045 + Math.sin(t.current * 0.22) * 0.04;
      }
      g.scale.setScalar(1 + pulse.current * 0.18);
    }
    if (dust.current) dust.current.rotation.y += delta * 0.02;
    if (nodeMat.current) nodeMat.current.uniforms.uTime.value = t.current;

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
      <group ref={graph} rotation={[0.4, 0, 0.25]}>
        {/* invisible hit target around the whole cloud */}
        <mesh
          onClick={onBurst}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "")}
        >
          <sphereGeometry args={[3.2, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[nodes.pos, 3]} />
            <bufferAttribute attach="attributes-aPhase" args={[nodes.phase, 1]} />
            <bufferAttribute attach="attributes-aBoost" args={[nodes.boost, 1]} />
          </bufferGeometry>
          <shaderMaterial
            ref={nodeMat}
            vertexShader={NODE_VERTEX}
            fragmentShader={NODE_FRAGMENT}
            uniforms={{
              uTime: { value: 0 },
              uSize: { value: 0.05 },
              uColor: { value: new THREE.Color("#6ee7b7") },
            }}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[edges, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color="#6ee7b7"
            transparent
            opacity={0.22}
            depthWrite={false}
          />
        </lineSegments>
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
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
      <FloatingLabels radius={narrow ? 0.52 : 0.55} narrow={narrow} />
    </div>
  );
}
