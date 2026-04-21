"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const NODE_COUNT = 24;

function det(n: number, offset = 0) {
  return (Math.sin(n * 127.1 + offset * 311.7) * 0.5 + 0.5);
}

interface NodeData {
  id: number;
  pos: THREE.Vector3;
  isHub: boolean;
  isMajor: boolean;
  phase: number;
  size: number;
}

function NodeMesh({ node }: { node: NodeData }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 1.8 + node.phase) * (node.isHub ? 0.18 : 0.1);
    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref} position={node.pos}>
      <sphereGeometry args={[node.size, 20, 20]} />
      <meshStandardMaterial
        color={node.isHub ? "#FFFFFF" : "#0071E3"}
        emissive={node.isHub ? "#2997FF" : "#004899"}
        emissiveIntensity={node.isHub ? 2.0 : 1.2}
        roughness={0.15}
        metalness={0.6}
      />
    </mesh>
  );
}

function NetworkGraph() {
  const groupRef = useRef<THREE.Group>(null);

  const { nodes, edges } = useMemo<{ nodes: NodeData[]; edges: [number, number][] }>(() => {
    const nodes: NodeData[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
      id: i,
      pos: new THREE.Vector3(
        (det(i, 0) - 0.5) * 16,
        (det(i, 1) - 0.5) * 9,
        (det(i, 2) - 0.5) * 11,
      ),
      isHub: i === 0,
      isMajor: i > 0 && i < 5,
      phase: det(i, 3) * Math.PI * 2,
      size: i === 0 ? 0.32 : i < 5 ? 0.18 : 0.1,
    }));

    nodes[0].pos.set(0, 0, 0);
    nodes[1].pos.set(-3.5, 1.5, 1);
    nodes[2].pos.set(3.2, -1.2, 0.5);
    nodes[3].pos.set(-1.5, -3, -1);
    nodes[4].pos.set(2.5, 2.8, -1.5);

    const edges: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].pos.distanceTo(nodes[j].pos);
        const threshold = (nodes[i].isHub || nodes[j].isHub) ? 9 : nodes[i].isMajor || nodes[j].isMajor ? 5.5 : 4;
        if (d < threshold) edges.push([i, j]);
      }
    }
    return { nodes, edges };
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.055;
    groupRef.current.rotation.x = Math.sin(t * 0.07) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {edges.map(([i, j]) => (
        <Line
          key={`${i}-${j}`}
          points={[nodes[i].pos.toArray() as [number,number,number], nodes[j].pos.toArray() as [number,number,number]]}
          color="#0071E3"
          lineWidth={0.7}
          transparent
          opacity={0.16}
        />
      ))}
      {nodes.map((n) => (
        <NodeMesh key={n.id} node={n} />
      ))}
    </group>
  );
}

function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x * 2.5 - camera.position.x) * 0.018;
    camera.position.y += (mouse.current.y * 1.8 - camera.position.y) * 0.018;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 48 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={60} color="#0071E3" />
      <pointLight position={[8, 6, 5]} intensity={40} color="#FFFFFF" />
      <pointLight position={[-6, -4, 2]} intensity={20} color="#2997FF" />
      <NetworkGraph />
      <CameraRig />
    </Canvas>
  );
}
