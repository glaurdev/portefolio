"use client";
import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Global scroll singleton ─── */
const S = { p: 0 }; // p = progress 0→1

function initScroll() {
  if (typeof window === "undefined") return () => {};
  const h = () => { S.p = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1); };
  window.addEventListener("scroll", h, { passive: true });
  return () => window.removeEventListener("scroll", h);
}

/* ─── Smooth lerp helper ─── */
function lp(a: number, b: number, t = 0.06) { return a + (b - a) * t; }

/* ─── Fade-in/out helper ─── */
function setOpacity(g: THREE.Group, o: number) {
  g.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      const m = c.material as THREE.MeshStandardMaterial | THREE.MeshBasicMaterial;
      if (m.transparent) m.opacity = o;
    }
  });
}

/* ─── Materials (shared) ─── */
const MAT = {
  chassis:   () => new THREE.MeshStandardMaterial({ color: "#1c1c1e", metalness: 0.88, roughness: 0.12, transparent: true }),
  panel:     () => new THREE.MeshStandardMaterial({ color: "#2c2c2e", metalness: 0.5,  roughness: 0.3,  transparent: true }),
  screen:    () => new THREE.MeshStandardMaterial({ color: "#0a0a0f", emissive: "#0a0f1a", emissiveIntensity: 0.8, transparent: true }),
  blue:      () => new THREE.MeshBasicMaterial({ color: "#0071E3", transparent: true }),
  blueL:     () => new THREE.MeshBasicMaterial({ color: "#2997FF", transparent: true }),
  green:     () => new THREE.MeshBasicMaterial({ color: "#30D158", transparent: true }),
  white:     () => new THREE.MeshStandardMaterial({ color: "#f5f5f7", metalness: 0.3, roughness: 0.4, transparent: true }),
  orange:    () => new THREE.MeshBasicMaterial({ color: "#FF9F0A", transparent: true }),
};

/* ══════════════════════ DEVICE MODELS ══════════════════════ */

function ServerUnit({ yOff = 0 }: { yOff?: number }) {
  return (
    <group position={[0, yOff, 0]}>
      {/* Chassis */}
      <mesh material={MAT.chassis()}>
        <boxGeometry args={[1.8, 0.38, 0.7]} />
      </mesh>
      {/* Front panel */}
      <mesh position={[0, 0, 0.36]} material={MAT.panel()}>
        <boxGeometry args={[1.6, 0.28, 0.01]} />
      </mesh>
      {/* Drive bays */}
      {[-0.55, -0.18, 0.18, 0.55].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.37]} material={MAT.panel()}>
          <boxGeometry args={[0.28, 0.16, 0.01]} />
        </mesh>
      ))}
      {/* LEDs */}
      <mesh position={[0.72, 0.06, 0.37]} material={MAT.green()}>
        <sphereGeometry args={[0.028, 8, 8]} />
      </mesh>
      <mesh position={[0.72, -0.06, 0.37]} material={MAT.blue()}>
        <sphereGeometry args={[0.022, 8, 8]} />
      </mesh>
      {/* Power btn */}
      <mesh position={[-0.72, 0, 0.37]} material={MAT.blueL()}>
        <cylinderGeometry args={[0.045, 0.045, 0.015, 12]} />
      </mesh>
    </group>
  );
}

function ServerStack({ ref: _r, ...props }: React.ComponentProps<"group">) {
  const g = useRef<THREE.Group>(null);
  const f = useRef(0);

  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.getElapsedTime();
    const target = S.p >= 0.12 && S.p <= 0.72 ? 1 : 0;
    f.current = lp(f.current, target);
    setOpacity(g.current, f.current);
    g.current.position.x = lp(g.current.position.x, S.p < 0.12 ? 12 : S.p > 0.72 ? 12 : 6.5);
    g.current.position.y = lp(g.current.position.y, -1.2 + Math.sin(t * 0.5) * 0.08);
    g.current.rotation.y = lp(g.current.rotation.y, -0.4 + Math.sin(t * 0.25) * 0.1);
    g.current.rotation.x = lp(g.current.rotation.x, 0.08);
  });

  return (
    <group ref={g} position={[12, -1.2, 0]}>
      {/* Rack frame */}
      <mesh material={MAT.chassis()}>
        <boxGeometry args={[2.0, 2.6, 0.9]} />
      </mesh>
      <mesh position={[0, 0, 0.41]} material={MAT.panel()}>
        <boxGeometry args={[1.85, 2.45, 0.01]} />
      </mesh>
      <ServerUnit yOff={0.84} />
      <ServerUnit yOff={0.42} />
      <ServerUnit yOff={0.0} />
      <ServerUnit yOff={-0.42} />
      {/* Rack blue glow */}
      <pointLight position={[0, 0, 1]} intensity={3} color="#0071E3" distance={3} />
    </group>
  );
}

function MonitorDevice() {
  const g = useRef<THREE.Group>(null);
  const f = useRef(0);

  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.getElapsedTime();
    const target = S.p >= 0.18 && S.p <= 0.75 ? 1 : 0;
    f.current = lp(f.current, target);
    setOpacity(g.current, f.current);
    g.current.position.x = lp(g.current.position.x, S.p < 0.18 ? -12 : S.p > 0.75 ? -12 : -6.2);
    g.current.position.y = lp(g.current.position.y, 1.8 + Math.sin(t * 0.6 + 1) * 0.12);
    g.current.rotation.y = lp(g.current.rotation.y, 0.35 + Math.sin(t * 0.2) * 0.06);
  });

  return (
    <group ref={g} position={[-12, 1.8, 0]}>
      {/* Screen body */}
      <mesh material={MAT.chassis()}>
        <boxGeometry args={[2.2, 1.4, 0.09]} />
      </mesh>
      {/* Display */}
      <mesh position={[0, 0.05, 0.052]} material={MAT.screen()}>
        <boxGeometry args={[2.0, 1.2, 0.01]} />
      </mesh>
      {/* Terminal text lines (emissive) */}
      {[-0.35, -0.1, 0.15, 0.4].map((y, i) => (
        <mesh key={i} position={[-0.4 + i * 0.06, y, 0.058]} material={MAT.blueL()}>
          <boxGeometry args={[0.55 + Math.sin(i * 2.3) * 0.25, 0.04, 0.001]} />
        </mesh>
      ))}
      {/* Stand */}
      <mesh position={[0, -0.82, 0]} material={MAT.chassis()}>
        <cylinderGeometry args={[0.06, 0.06, 0.45, 10]} />
      </mesh>
      <mesh position={[0, -1.06, 0]} material={MAT.chassis()}>
        <boxGeometry args={[0.7, 0.06, 0.4]} />
      </mesh>
      {/* Power LED */}
      <mesh position={[0, -0.63, 0.047]} material={MAT.blue()}>
        <sphereGeometry args={[0.022, 8, 8]} />
      </mesh>
    </group>
  );
}

function PhoneDevice() {
  const g = useRef<THREE.Group>(null);
  const f = useRef(0);

  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.getElapsedTime();
    const target = S.p >= 0.08 && S.p <= 0.62 ? 1 : 0;
    f.current = lp(f.current, target);
    setOpacity(g.current, f.current);
    g.current.position.x = lp(g.current.position.x, S.p < 0.08 ? 10 : S.p > 0.62 ? 10 : 5.8);
    g.current.position.y = lp(g.current.position.y, 3.0 + Math.sin(t * 0.9 + 2) * 0.14);
    g.current.rotation.z = lp(g.current.rotation.z, Math.sin(t * 0.35) * 0.12);
    g.current.rotation.y = lp(g.current.rotation.y, -0.3);
  });

  return (
    <group ref={g} position={[10, 3, 0]}>
      {/* Body */}
      <mesh material={MAT.chassis()}>
        <boxGeometry args={[0.62, 1.28, 0.075]} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.04, 0.04]} material={MAT.screen()}>
        <boxGeometry args={[0.54, 1.1, 0.005]} />
      </mesh>
      {/* App grid */}
      {[[-0.15, 0.22], [0.05, 0.22], [0.25, 0.22],
        [-0.15, 0.02], [0.05, 0.02], [0.25, 0.02]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.045]} material={MAT.blueL()}>
          <boxGeometry args={[0.12, 0.12, 0.001]} />
        </mesh>
      ))}
      {/* Home indicator */}
      <mesh position={[0, -0.48, 0.041]} material={MAT.panel()}>
        <boxGeometry args={[0.22, 0.022, 0.001]} />
      </mesh>
      {/* Camera bump */}
      <mesh position={[0.1, 0.52, -0.042]}>
        <boxGeometry args={[0.18, 0.18, 0.02]} />
        <meshStandardMaterial color="#111113" metalness={0.9} roughness={0.1} transparent />
      </mesh>
      <mesh position={[0.1, 0.52, -0.05]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#050507" metalness={0.95} roughness={0.05} transparent />
      </mesh>
    </group>
  );
}

function RouterDevice() {
  const g = useRef<THREE.Group>(null);
  const f = useRef(0);

  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.getElapsedTime();
    const target = S.p >= 0.35 && S.p <= 0.85 ? 1 : 0;
    f.current = lp(f.current, target);
    setOpacity(g.current, f.current);
    g.current.position.x = lp(g.current.position.x, S.p < 0.35 ? -11 : S.p > 0.85 ? -11 : -5.6);
    g.current.position.y = lp(g.current.position.y, -2.8 + Math.sin(t * 0.7 + 3) * 0.1);
    g.current.rotation.y = lp(g.current.rotation.y, 0.5 + Math.sin(t * 0.18) * 0.1);
  });

  return (
    <group ref={g} position={[-11, -2.8, 0]}>
      {/* Base */}
      <mesh material={MAT.chassis()}>
        <boxGeometry args={[1.6, 0.28, 0.95]} />
      </mesh>
      {/* Antenna ×3 */}
      {[-0.5, 0, 0.5].map((x, i) => (
        <group key={i} position={[x, 0.42, -0.3]} rotation={[0, 0, (i - 1) * 0.18]}>
          <mesh material={MAT.chassis()}>
            <cylinderGeometry args={[0.03, 0.035, 0.7, 8]} />
          </mesh>
          <mesh position={[0, 0.38, 0]} material={MAT.blueL()}>
            <sphereGeometry args={[0.04, 8, 8]} />
          </mesh>
        </group>
      ))}
      {/* Port row */}
      {[-0.5, -0.25, 0, 0.25, 0.5].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.49]} material={MAT.panel()}>
          <boxGeometry args={[0.13, 0.1, 0.01]} />
        </mesh>
      ))}
      {/* LED strip */}
      {[-0.5, -0.25, 0, 0.25, 0.5].map((x, i) => (
        <mesh key={i} position={[x, -0.08, 0.49]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#30D158" : "#0071E3"} transparent />
        </mesh>
      ))}
    </group>
  );
}

function LaptopDevice() {
  const g = useRef<THREE.Group>(null);
  const f = useRef(0);

  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.getElapsedTime();
    const target = S.p >= 0.5 && S.p <= 0.92 ? 1 : 0;
    f.current = lp(f.current, target);
    setOpacity(g.current, f.current);
    g.current.position.x = lp(g.current.position.x, S.p < 0.5 ? 11 : S.p > 0.92 ? 11 : 5.5);
    g.current.position.y = lp(g.current.position.y, -1.5 + Math.sin(t * 0.55 + 1) * 0.1);
    g.current.rotation.y = lp(g.current.rotation.y, -0.4 + Math.sin(t * 0.22) * 0.07);
  });

  return (
    <group ref={g} position={[11, -1.5, 0]}>
      {/* Lid */}
      <group position={[0, 0.7, -0.44]} rotation={[-Math.PI / 2 + 0.25, 0, 0]}>
        <mesh material={MAT.chassis()}>
          <boxGeometry args={[1.8, 1.15, 0.07]} />
        </mesh>
        <mesh position={[0, 0, 0.04]} material={MAT.screen()}>
          <boxGeometry args={[1.64, 1.02, 0.005]} />
        </mesh>
        {/* Code lines on screen */}
        {[-0.3, -0.1, 0.1, 0.3].map((y, i) => (
          <mesh key={i} position={[-0.2, y, 0.047]} material={MAT.blueL()}>
            <boxGeometry args={[0.5 + i * 0.1, 0.035, 0.001]} />
          </mesh>
        ))}
        {/* Apple-like logo on back */}
        <mesh position={[0, 0, -0.038]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#3a3a3c" metalness={0.9} roughness={0.1} transparent />
        </mesh>
      </group>
      {/* Base / keyboard */}
      <mesh position={[0, 0, 0]} material={MAT.chassis()}>
        <boxGeometry args={[1.8, 0.09, 1.2]} />
      </mesh>
      <mesh position={[0, 0.052, 0.08]} material={MAT.panel()}>
        <boxGeometry args={[1.6, 0.005, 0.9]} />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, 0.052, 0.38]} material={MAT.panel()}>
        <boxGeometry args={[0.4, 0.003, 0.28]} />
      </mesh>
    </group>
  );
}

/* ─── Animated robot character ─── */
function WavingArm({ side = 1 }: { side?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = side * (-Math.PI / 4 + Math.sin(clock.getElapsedTime() * 3.2) * 0.55);
  });
  return (
    <group ref={ref} position={[side * 0.42, 0.1, 0]}>
      <mesh>
        <cylinderGeometry args={[0.07, 0.07, 0.52, 10]} />
        <meshStandardMaterial color="#2c2c2e" metalness={0.7} roughness={0.2} transparent />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshStandardMaterial color="#1c1c1e" metalness={0.8} roughness={0.15} transparent />
      </mesh>
    </group>
  );
}

function RobotCharacter() {
  const g = useRef<THREE.Group>(null);
  const f = useRef(0);
  const walkT = useRef(0);

  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.getElapsedTime();
    const target = S.p <= 0.3 ? 1 : 0;
    f.current = lp(f.current, target, 0.04);
    setOpacity(g.current, f.current);
    // Enter from bottom-left
    g.current.position.x = lp(g.current.position.x, S.p > 0.3 ? -14 : -5.8);
    g.current.position.y = lp(g.current.position.y, -3.2 + Math.sin(t * 1.4) * 0.07);
    g.current.rotation.y = lp(g.current.rotation.y, 0.4 + Math.sin(t * 0.4) * 0.15);
    // Leg walk cycle
    walkT.current = t;
  });

  return (
    <group ref={g} position={[-14, -3.2, 0]} scale={0.9}>
      {/* Head */}
      <group position={[0, 1.15, 0]}>
        <mesh>
          <boxGeometry args={[0.6, 0.5, 0.52]} />
          <meshStandardMaterial color="#1c1c1e" metalness={0.85} roughness={0.12} transparent />
        </mesh>
        {/* Eyes */}
        {[-0.14, 0.14].map((x, i) => (
          <group key={i} position={[x, 0.04, 0.27]}>
            <mesh>
              <sphereGeometry args={[0.09, 12, 12]} />
              <meshStandardMaterial color="#0a0a0f" metalness={0.5} roughness={0.3} transparent />
            </mesh>
            <mesh position={[0, 0, 0.07]}>
              <sphereGeometry args={[0.05, 10, 10]} />
              <meshBasicMaterial color="#0071E3" transparent />
            </mesh>
            {/* Pupil glow */}
            <pointLight position={[0, 0, 0.1]} intensity={0.8} color="#2997FF" distance={0.5} />
          </group>
        ))}
        {/* Mouth line */}
        <mesh position={[0, -0.12, 0.27]}>
          <boxGeometry args={[0.22, 0.025, 0.001]} />
          <meshBasicMaterial color="#30D158" transparent />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.42, 8]} />
          <meshBasicMaterial color="#2997FF" transparent />
        </mesh>
        <mesh position={[0, 0.62, 0]}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshBasicMaterial color="#2997FF" transparent />
        </mesh>
      </group>

      {/* Body */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[0.7, 0.72, 0.5]} />
        <meshStandardMaterial color="#1c1c1e" metalness={0.85} roughness={0.12} transparent />
      </mesh>
      {/* Chest panel */}
      <mesh position={[0, 0.44, 0.26]}>
        <boxGeometry args={[0.42, 0.4, 0.01]} />
        <meshStandardMaterial color="#2c2c2e" metalness={0.5} roughness={0.3} transparent />
      </mesh>
      {/* Chest LEDs */}
      {[[-0.1, 0.58], [0.1, 0.58], [-0.1, 0.44], [0.1, 0.44]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.268]}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshBasicMaterial color={i < 2 ? "#0071E3" : "#30D158"} transparent />
        </mesh>
      ))}

      {/* Arms */}
      <WavingArm side={1} />
      <group position={[-0.42, 0.1, 0]} rotation={[0, 0, Math.PI / 5]}>
        <mesh>
          <cylinderGeometry args={[0.07, 0.07, 0.52, 10]} />
          <meshStandardMaterial color="#2c2c2e" metalness={0.7} roughness={0.2} transparent />
        </mesh>
      </group>

      {/* Legs */}
      {[-0.16, 0.16].map((x, i) => (
        <group key={i} position={[x, -0.1, 0]}>
          <mesh>
            <cylinderGeometry args={[0.09, 0.09, 0.62, 10]} />
            <meshStandardMaterial color="#2c2c2e" metalness={0.7} roughness={0.2} transparent />
          </mesh>
          <mesh position={[0, -0.38, 0.08]}>
            <boxGeometry args={[0.18, 0.12, 0.3]} />
            <meshStandardMaterial color="#1c1c1e" metalness={0.85} roughness={0.12} transparent />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─── Data packets flying between devices ─── */
function DataPackets() {
  const count = 12;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const packets = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      phase:  (i / count) * Math.PI * 2,
      speed:  0.4 + Math.random() * 0.6,
      radius: 4.5 + Math.random() * 5,
      yBase:  (Math.random() - 0.5) * 6,
      side:   i % 2 === 0 ? 1 : -1,
    })), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const visible = S.p > 0.05 && S.p < 0.95;
    packets.forEach((pk, i) => {
      const a = t * pk.speed + pk.phase;
      dummy.position.set(
        Math.cos(a) * pk.radius * pk.side,
        pk.yBase + Math.sin(a * 0.7) * 1.5,
        Math.sin(a) * 3,
      );
      dummy.scale.setScalar(visible ? 0.06 : 0);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#2997FF" transparent opacity={0.7} />
    </instancedMesh>
  );
}

/* ─── Scene root ─── */
function FloatingScene() {
  useEffect(() => initScroll(), []);
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[8, 10, 6]} intensity={0.9} color="#F5F5F7" />
      <pointLight position={[-8, -4, 4]} intensity={0.6} color="#0071E3" />
      <pointLight position={[6, 6, 2]} intensity={0.4} color="#2997FF" />

      <RobotCharacter />
      <ServerStack />
      <MonitorDevice />
      <PhoneDevice />
      <RouterDevice />
      <LaptopDevice />
      <DataPackets />
    </>
  );
}

/* ─── Export: fixed full-page canvas ─── */
export default function FloatingDevices() {
  return (
    <div
      style={{
        position: "fixed", inset: 0,
        zIndex: 3,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 18], fov: 46 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <FloatingScene />
      </Canvas>
    </div>
  );
}
