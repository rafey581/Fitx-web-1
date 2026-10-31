"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/**
 * Home hero 3D: studio-lit training equipment floating over the chalk-white
 * page. Built from primitives (no model downloads), lit by in-scene light
 * formers so it renders offline and loads instantly.
 */

const ORANGE = "#ff4b00";

const pointer = { x: 0, y: 0 };
const scroll = { p: 0 };

function useMaterials() {
  return useMemo(
    () => ({
      rubber: new THREE.MeshPhysicalMaterial({ color: "#16151a", roughness: 0.42, metalness: 0.05, clearcoat: 0.6, clearcoatRoughness: 0.35 }),
      chrome: new THREE.MeshStandardMaterial({ color: "#e9e9ee", roughness: 0.12, metalness: 1 }),
      knurl: new THREE.MeshStandardMaterial({ color: "#c9c9d0", roughness: 0.38, metalness: 1 }),
      orange: new THREE.MeshPhysicalMaterial({ color: ORANGE, roughness: 0.25, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.12 }),
      castIron: new THREE.MeshPhysicalMaterial({ color: "#1d1c22", roughness: 0.55, metalness: 0.4, clearcoat: 0.3 }),
    }),
    [],
  );
}

type Mats = ReturnType<typeof useMaterials>;

/** Hex dumbbell lying along the X axis. */
function Dumbbell({ m }: { m: Mats }) {
  const head = (side: 1 | -1) => (
    <group position={[side * 1.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      {/* Hexagonal rubber head */}
      <mesh material={m.rubber} castShadow rotation={[0, Math.PI / 6, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.78, 6, 1]} />
      </mesh>
      {/* Orange brand faces */}
      <mesh material={m.orange} position={[0, side * 0.395, 0]} rotation={[0, Math.PI / 6, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.02, 6, 1]} />
      </mesh>
      {/* Chrome collar towards the handle */}
      <mesh material={m.chrome} position={[0, -side * 0.45, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.14, 40]} />
      </mesh>
    </group>
  );
  return (
    <group>
      <mesh material={m.knurl} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 1.6, 40]} />
      </mesh>
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} material={m.chrome} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.135, 0.018, 12, 40]} />
        </mesh>
      ))}
      {head(1)}
      {head(-1)}
    </group>
  );
}

/** Kettlebell: bell, flat base and an arched handle. */
function Kettlebell({ m }: { m: Mats }) {
  return (
    <group>
      <mesh material={m.orange} castShadow>
        <sphereGeometry args={[0.62, 48, 48]} />
      </mesh>
      <mesh material={m.orange} position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.12, 40]} />
      </mesh>
      <mesh material={m.castIron} position={[0, 0.62, 0]}>
        <torusGeometry args={[0.38, 0.09, 20, 48, Math.PI]} />
      </mesh>
      {[-0.38, 0.38].map((x) => (
        <mesh key={x} material={m.castIron} position={[x, 0.5, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.24, 20]} />
        </mesh>
      ))}
    </group>
  );
}

/** Bumper plate with a chrome hub. */
function Plate({ m }: { m: Mats }) {
  const shape = useMemo(() => {
    const points = [
      new THREE.Vector2(0.16, -0.14),
      new THREE.Vector2(0.95, -0.14),
      new THREE.Vector2(1, -0.1),
      new THREE.Vector2(1, 0.1),
      new THREE.Vector2(0.95, 0.14),
      new THREE.Vector2(0.16, 0.14),
    ];
    return new THREE.LatheGeometry(points, 64);
  }, []);
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh geometry={shape} material={m.rubber} castShadow />
      <mesh material={m.orange} position={[0, 0.142, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.78, 64]} />
      </mesh>
      <mesh material={m.chrome}>
        <cylinderGeometry args={[0.24, 0.24, 0.3, 40, 1, true]} />
      </mesh>
    </group>
  );
}

function Rig({ mobile }: { mobile: boolean }) {
  const root = useRef<THREE.Group>(null);
  const bell = useRef<THREE.Group>(null);
  const kb = useRef<THREE.Group>(null);
  const plate = useRef<THREE.Group>(null);
  const m = useMaterials();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const k = 1 - Math.exp(-delta * 4);
    if (root.current) {
      root.current.rotation.y += (pointer.x * 0.35 - root.current.rotation.y) * k;
      root.current.rotation.x += (-pointer.y * 0.18 - root.current.rotation.x) * k;
      root.current.position.y = scroll.p * 2.2;
    }
    if (bell.current) {
      bell.current.rotation.y = -0.6 + t * 0.25 + scroll.p * 2.5;
      bell.current.rotation.z = 0.32 + Math.sin(t * 0.6) * 0.06;
    }
    if (kb.current) kb.current.rotation.y = 0.6 - t * 0.18 - scroll.p * 1.5;
    if (plate.current) {
      plate.current.rotation.z = t * 0.3;
      plate.current.rotation.x = -0.5 + scroll.p;
    }
    state.camera.position.z = (mobile ? 8 : 7.5) + scroll.p * 1.5;
  });

  // Desktop: equipment sits right of the headline. Phone: above it.
  const base: [number, number, number] = mobile ? [0.2, 0.2, 0] : [1.85, 0.1, 0];

  return (
    <group ref={root}>
      <group position={base}>
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
          <group ref={bell} scale={mobile ? 0.72 : 0.82}>
            <Dumbbell m={m} />
          </group>
        </Float>
        <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.9}>
          <group ref={kb} position={mobile ? [-1.35, -1.2, -0.6] : [-1.7, -1.25, 0.2]} scale={mobile ? 0.55 : 0.62}>
            <Kettlebell m={m} />
          </group>
        </Float>
        <Float speed={1.7} rotationIntensity={0.5} floatIntensity={1.1}>
          <group ref={plate} position={mobile ? [1.3, 1.2, -2] : [1.5, 1.5, -2]} scale={mobile ? 0.5 : 0.6}>
            <Plate m={m} />
          </group>
        </Float>
      </group>
      <ContactShadows
        position={[base[0], mobile ? -1.6 : -1.9, 0]}
        opacity={0.35}
        scale={12}
        blur={2.6}
        far={4}
        resolution={512}
        color="#3a2a22"
      />
    </group>
  );
}

export default function HeroScene() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      scroll.p = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", set);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.5], fov: 38 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      shadows
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} castShadow />
      <Suspense fallback={null}>
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 4, 4]} scale={[10, 2, 1]} />
          <Lightformer form="rect" intensity={2} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
          <Lightformer form="rect" intensity={1.5} color={ORANGE} position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
          <Lightformer form="ring" intensity={2} position={[2, 2, -4]} scale={3} />
        </Environment>
        <Rig mobile={mobile} />
      </Suspense>
    </Canvas>
  );
}
