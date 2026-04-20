"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1800;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const goldColor = new THREE.Color("#C9A84C");
    const purpleColor = new THREE.Color("#7B61FF");
    const whiteColor = new THREE.Color("#E8E8E8");

    for (let i = 0; i < count; i++) {
      const r = 12 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mix = Math.random();
      const color = mix < 0.5 ? goldColor : mix < 0.75 ? purpleColor : whiteColor;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

function CentralOrb() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.18;
      outerRef.current.rotation.y = t * 0.28;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.25;
      innerRef.current.rotation.z = t * 0.15;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.1;
      ringsRef.current.rotation.x = Math.sin(t * 0.3) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        {/* Outer icosahedron wireframe */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[2.6, 1]} />
          <meshStandardMaterial
            color="#C9A84C"
            wireframe
            transparent
            opacity={0.18}
          />
        </mesh>

        {/* Inner solid icosahedron */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshStandardMaterial
            color="#1a1020"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
          />
        </mesh>

        {/* Gold inner glow sphere */}
        <mesh>
          <sphereGeometry args={[1.0, 32, 32]} />
          <meshStandardMaterial
            color="#C9A84C"
            emissive="#8B5E1A"
            emissiveIntensity={0.8}
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Orbiting rings */}
        <group ref={ringsRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3.8, 0.015, 8, 120]} />
            <meshStandardMaterial color="#C9A84C" transparent opacity={0.35} />
          </mesh>
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[4.6, 0.01, 8, 120]} />
            <meshStandardMaterial color="#7B61FF" transparent opacity={0.25} />
          </mesh>
          <mesh rotation={[-Math.PI / 5, Math.PI / 3, 0]}>
            <torusGeometry args={[5.2, 0.008, 8, 120]} />
            <meshStandardMaterial color="#C9A84C" transparent opacity={0.15} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.02;
    camera.position.y += (mouse.current.y * 1.5 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 55 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[8, 8, 8]} intensity={2} color="#C9A84C" />
      <pointLight position={[-8, -8, 4]} intensity={1} color="#7B61FF" />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#ffffff" />

      <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />
      <Particles />
      <CentralOrb />
      <CameraRig />
    </Canvas>
  );
}
