import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useMemo } from "react";

// Soft 3D objects drifting behind the profile. Deliberately low-contrast so the
// cards stay readable — this is atmosphere, not content.

// Kept small, spread wide and pushed well behind the card column — the cards
// sit in the middle of the screen and must stay perfectly readable.
const SHAPES = [
  { pos: [-6.4, 2.4, -6], color: "#FF5A5F", geo: "torus", scale: 0.85, speed: 1.1 },
  { pos: [6.6, 1.2, -7], color: "#FFB33E", geo: "ico", scale: 1.0, speed: 0.8 },
  { pos: [-5.6, -2.6, -6.5], color: "#2FB574", geo: "capsule", scale: 0.75, speed: 1.4 },
  { pos: [5.4, -3.4, -5.5], color: "#FF5A5F", geo: "sphere", scale: 0.5, speed: 1.7 },
  { pos: [-2.2, 4.4, -9], color: "#FFB33E", geo: "torus", scale: 0.6, speed: 0.9 },
  { pos: [-8.2, -0.4, -9.5], color: "#C9A7FF", geo: "sphere", scale: 1.1, speed: 0.6 },
  { pos: [8.0, 3.6, -9.5], color: "#2FB574", geo: "ico", scale: 0.7, speed: 1.2 },
  { pos: [2.6, -5.2, -8.5], color: "#C9A7FF", geo: "capsule", scale: 0.65, speed: 1.0 },
];

function Geo({ kind }) {
  switch (kind) {
    case "torus":
      return <torusGeometry args={[0.8, 0.3, 20, 48]} />;
    case "ico":
      return <icosahedronGeometry args={[0.9, 0]} />;
    case "capsule":
      return <capsuleGeometry args={[0.42, 0.9, 8, 20]} />;
    default:
      return <sphereGeometry args={[0.85, 32, 24]} />;
  }
}

function Blob({ pos, color, geo, scale, speed, reduced }) {
  const ref = useRef();
  useFrame((_, dt) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.x += dt * 0.12 * speed;
    ref.current.rotation.y += dt * 0.16 * speed;
  });
  return (
    <Float
      speed={reduced ? 0 : speed}
      rotationIntensity={reduced ? 0 : 0.5}
      floatIntensity={reduced ? 0 : 1.1}
      position={pos}
    >
      <mesh ref={ref} scale={scale}>
        <Geo kind={geo} />
        <meshStandardMaterial
          color={color}
          roughness={0.28}
          metalness={0.05}
          envMapIntensity={0.85}
        />
      </mesh>
    </Float>
  );
}

function Parallax({ children, reduced }) {
  const group = useRef();
  const { viewport } = useThree();
  useFrame(({ pointer }) => {
    if (reduced || !group.current) return;
    group.current.position.x +=
      (pointer.x * viewport.width * 0.03 - group.current.position.x) * 0.05;
    group.current.position.y +=
      (pointer.y * viewport.height * 0.03 - group.current.position.y) * 0.05;
  });
  return <group ref={group}>{children}</group>;
}

export default function AmbientScene({ reduced = false }) {
  const shapes = useMemo(() => SHAPES, []);
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
      frameloop={reduced ? "demand" : "always"}
    >
      {/* Lit by hand rather than an HDRI — keeps three.js's Environment
          loader (and its CDN fetch) out of the bundle. */}
      <hemisphereLight args={["#fff6ec", "#d9c9b8", 1.15]} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} />
      <directionalLight position={[-5, -2, 2]} intensity={0.6} color="#ffd9c2" />
      <pointLight position={[0, 0, 4]} intensity={12} distance={14} color="#ffffff" />
      <Parallax reduced={reduced}>
        {shapes.map((s, i) => (
          <Blob key={i} {...s} reduced={reduced} />
        ))}
      </Parallax>
    </Canvas>
  );
}
