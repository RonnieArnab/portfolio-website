import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// All models are assembled from primitives — nothing is downloaded, so there are
// no third-party 3D-model licenses to track.

function Spin({ children, on = true, speed = 0.4 }) {
  const ref = useRef();
  useFrame((_, dt) => {
    if (on && ref.current) ref.current.rotation.y += dt * speed;
  });
  return <group ref={ref}>{children}</group>;
}

function Crystal({ color }) {
  return (
    <group>
      <mesh castShadow>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.15}
          emissive={color}
          emissiveIntensity={0.25}
          flatShading
        />
      </mesh>
      <mesh scale={1.35}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function Trophy({ color }) {
  return (
    <group position={[0, -0.4, 0]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.9, 0.35, 6]} />
        <meshStandardMaterial color="#3a2a17" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 0.7, 8]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.55, 16, 12, 0, Math.PI * 2, 0, Math.PI / 1.5]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh position={[-0.62, 1.1, 0]} rotation={[0, 0, 0.5]}>
        <torusGeometry args={[0.18, 0.05, 8, 16, Math.PI]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0.62, 1.1, 0]} rotation={[0, 0, -0.5]}>
        <torusGeometry args={[0.18, 0.05, 8, 16, Math.PI]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Scroll({ color }) {
  return (
    <group rotation={[0.2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.9, 0.9, 1.6, 24, 1, true]} />
        <meshStandardMaterial
          color="#f4ecd8"
          side={THREE.DoubleSide}
          roughness={0.9}
        />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[0, s * 0.95, 0]}>
          <cylinderGeometry args={[0.98, 0.98, 0.3, 24]} />
          <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.9]}>
        <planeGeometry args={[1.3, 1.2]} />
        <meshStandardMaterial color="#e7dcc0" roughness={1} />
      </mesh>
    </group>
  );
}

function Creature({ color }) {
  return (
    <group position={[0, -0.2, 0]}>
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.85, 16, 14]} />
        <meshStandardMaterial color={color} flatShading roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.9, 0.05]}>
        <sphereGeometry args={[0.55, 16, 14]} />
        <meshStandardMaterial color={color} flatShading roughness={0.6} />
      </mesh>
      {[-0.22, 0.22].map((x) => (
        <mesh key={x} position={[x, 1.0, 0.5]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#0e1a2b" />
        </mesh>
      ))}
      {[-0.35, 0.35].map((x) => (
        <mesh key={x} position={[x, 1.45, 0]} rotation={[0, 0, x < 0 ? 0.4 : -0.4]}>
          <coneGeometry args={[0.18, 0.5, 6]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
      ))}
      {[-0.5, 0.5].map((x) => (
        <mesh key={x} position={[x, -0.6, 0]}>
          <capsuleGeometry args={[0.16, 0.3, 4, 8]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
      ))}
    </group>
  );
}

const MODELS = { crystal: Crystal, trophy: Trophy, scroll: Scroll, creature: Creature };

export default function Showcase({ kind = "crystal", color = "#f5c542", reducedMotion = false }) {
  const Model = MODELS[kind] || Crystal;
  return (
    <div className="h-48 w-full sm:h-56">
      <Canvas camera={{ position: [0, 0.6, 4], fov: 45 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} castShadow />
        <directionalLight position={[-3, 1, -2]} intensity={0.35} color="#8bd" />
        <Environment preset="city" />
        <Float
          speed={reducedMotion ? 0 : 1.4}
          rotationIntensity={reducedMotion ? 0 : 0.4}
          floatIntensity={reducedMotion ? 0 : 0.6}
        >
          <Spin on={!reducedMotion}>
            <Model color={color} />
          </Spin>
        </Float>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
