"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vLocalPos;
  varying float vDisp;

  void main() {
    vNormal = normal;
    float t = uTime;

    float s = sin(position.x * 2.8 + t * 0.6)
            + sin(position.y * 3.2 + t * 0.8)
            + sin(position.z * 2.5 + t * 0.5);
    float c = cos(position.x * 1.8 + t * 0.4)
            + cos(position.y * 2.2 + t * 0.55);
    float d = (s * 0.5 + c * 0.35) * 0.075;
    vDisp = d;

    vec3 np = position + normal * d;
    vLocalPos = np;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(np, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uCamPos;
  varying vec3 vNormal;
  varying vec3 vLocalPos;
  varying float vDisp;

  void main() {
    vec3 viewDir = normalize(uCamPos - vLocalPos);
    float fresnel = 1.0 - max(dot(normalize(vNormal), viewDir), 0.0);
    fresnel = pow(fresnel, 1.6);

    float t = sin(uTime * 0.35) * 0.5 + 0.5;

    vec3 core   = vec3(0.04, 0.02, 0.12);
    vec3 gold   = vec3(0.79, 0.66, 0.30);
    vec3 bright = vec3(0.91, 0.79, 0.48);
    vec3 purple = vec3(0.48, 0.36, 0.94);

    vec3 color = mix(core, gold, fresnel);
    color = mix(color, bright, fresnel * fresnel * 0.7);
    color += purple * (1.0 - fresnel) * 0.25 * t;
    color += vec3(vDisp * 5.0, vDisp * 2.5, 0.0) * 0.12;

    float alpha = 0.85 + fresnel * 0.15;
    gl_FragColor = vec4(color, alpha);
  }
`;

function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uCamPos: { value: new THREE.Vector3(0, 0, 9) },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        side: THREE.FrontSide,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    material.uniforms.uTime.value = t;
    material.uniforms.uCamPos.value.copy(state.camera.position);

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.09;
      meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.12;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.05;
      wireRef.current.rotation.x = t * 0.03;
    }
  });

  return (
    <group>
      {/* Morphing shader sphere */}
      <mesh ref={meshRef} geometry={new THREE.IcosahedronGeometry(2.4, 5)} material={material} />

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.72, 3]} />
        <meshBasicMaterial color="#C9A84C" wireframe transparent opacity={0.07} />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[3.3, 32, 32]} />
        <meshBasicMaterial color="#C9A84C" transparent opacity={0.045} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function ParticleRing() {
  const ringRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 700;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const gold = new THREE.Color("#C9A84C");
    const purple = new THREE.Color("#7B5CF0");

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 4.2 + (Math.random() - 0.5) * 1.2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.0;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      const c = i % 3 === 0 ? purple : gold;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.07;
    }
  });

  return (
    <points ref={ringRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} vertexColors sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

function BackgroundParticles() {
  const positions = useMemo(() => {
    const count = 2200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 16 + Math.random() * 28;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      arr[i * 3 + 2] = r * Math.cos(ph);
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#666688" transparent opacity={0.55} />
    </points>
  );
}

function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x * 2.0 - camera.position.x) * 0.022;
    camera.position.y += (mouse.current.y * 1.4 - camera.position.y) * 0.022;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 52 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.25} color="#1a0830" />
      <pointLight position={[5, 5, 7]} intensity={90} color="#C9A84C" />
      <pointLight position={[-7, -4, 2]} intensity={60} color="#7B5CF0" />
      <pointLight position={[0, 0, 9]} intensity={18} color="#ffffff" />

      <Stars radius={90} depth={60} count={2500} factor={2.5} saturation={0} fade speed={0.4} />
      <BackgroundParticles />
      <ParticleRing />
      <MorphingSphere />
      <CameraRig />
    </Canvas>
  );
}
